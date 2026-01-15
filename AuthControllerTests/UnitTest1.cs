using Auction_Clock___SE2_Klas4_Groep6.Controllers;
using Auction_Clock___SE2_Klas4_Groep6.Models;
using Auction_Clock___SE2_Klas4_Groep6.Models.DTO_s;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

public class AuthControllerTests
{
    private static AppDbContext CreateInMemoryDb(string dbName)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(dbName)
            .Options;

        return new AppDbContext(options);
    }

    private static IConfiguration CreateTestConfig()
    {
        var dict = new Dictionary<string, string?>
        {
            ["Jwt:Key"] = "THIS_IS_A_TEST_KEY_32_CHARS_MINIMUM!!",
            ["Jwt:Issuer"] = "test-issuer",
            ["Jwt:Audience"] = "test-audience"
        };

        return new ConfigurationBuilder()
            .AddInMemoryCollection(dict)
            .Build();
    }

    private static Mock<UserManager<User>> CreateUserManagerMock()
    {
        var store = new Mock<IUserStore<User>>();
        return new Mock<UserManager<User>>(
            store.Object,
            null!, null!, null!, null!, null!, null!, null!, null!
        );
    }

    private static Mock<RoleManager<IdentityRole>> CreateRoleManagerMock()
    {
        var store = new Mock<IRoleStore<IdentityRole>>();
        return new Mock<RoleManager<IdentityRole>>(
            store.Object,
            new IRoleValidator<IdentityRole>[0],
            null!, null!, null!
        );
    }

    private static Mock<SignInManager<User>> CreateSignInManagerMock(Mock<UserManager<User>> userManager)
    {
        return new Mock<SignInManager<User>>(
            userManager.Object,
            new Mock<Microsoft.AspNetCore.Http.IHttpContextAccessor>().Object,
            new Mock<IUserClaimsPrincipalFactory<User>>().Object,
            null!, null!, null!, null!
        );
    }

    [Fact]
    public async Task Register_Then_Login_Succeeds_And_ReturnsToken()
    {
        // Arrange //
        var db = CreateInMemoryDb(nameof(Register_Then_Login_Succeeds_And_ReturnsToken));
        var config = CreateTestConfig();

        User? createdUser = null;

        var userManager = CreateUserManagerMock();

        userManager
            .Setup(m => m.CreateAsync(It.IsAny<User>(), It.IsAny<string>()))
            .Callback<User, string>((u, pw) =>
            {
                u.Id = "user-123"; // simuleer Identity Id //
                createdUser = u;
            })
            .ReturnsAsync(IdentityResult.Success);

        userManager
            .Setup(m => m.AddToRoleAsync(It.IsAny<User>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Success);

        userManager
            .Setup(m => m.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync((string email) =>
            {
                if (createdUser != null && createdUser.Email == email) return createdUser;
                return null;
            });

        userManager
            .Setup(m => m.CheckPasswordAsync(It.IsAny<User>(), It.IsAny<string>()))
            .ReturnsAsync(true);

        userManager
            .Setup(m => m.GetRolesAsync(It.IsAny<User>()))
            .ReturnsAsync(new List<string> { "Koper" });

        var roleManager = CreateRoleManagerMock();
        roleManager.Setup(r => r.RoleExistsAsync("Koper")).ReturnsAsync(true);

        var signInManager = CreateSignInManagerMock(userManager);

        var sut = new AuthController(
            userManager.Object,
            signInManager.Object,
            roleManager.Object,
            config,
            db
        );

        var registerDto = new RegisterDto
        {
            Email = "test@demo.com",
            Password = "P@ssw0rd!",
            Name = "Test User",
            TelNr = "0612345678",
            CompanyName = "ACME",
            CompanyAddress = "Street 1",
            Role = null
        };

        // Act: Register //
        var registerResult = await sut.Register(registerDto);

        // Assert: Register OK //
        var okRegister = Assert.IsType<OkObjectResult>(registerResult);
        Assert.Equal(200, okRegister.StatusCode);

        Assert.NotNull(createdUser);
        Assert.Equal("test@demo.com", createdUser!.Email);

        // Act: Login //
        var loginDto = new LoginDto
        {
            Email = "test@demo.com",
            Password = "P@ssw0rd!"
        };

        var loginResult = await sut.Login(loginDto);

        // Assert: Login OK + token // 
        var okLogin = Assert.IsType<OkObjectResult>(loginResult);
        Assert.Equal(200, okLogin.StatusCode);

        var tokenProp = okLogin.Value!.GetType().GetProperty("token");
        Assert.NotNull(tokenProp);

        var token = tokenProp!.GetValue(okLogin.Value) as string;
        Assert.False(string.IsNullOrWhiteSpace(token));

        // Verify belangrijke calls //
        userManager.Verify(m => m.CreateAsync(It.IsAny<User>(), "P@ssw0rd!"), Times.Once);
        userManager.Verify(m => m.AddToRoleAsync(It.IsAny<User>(), "Koper"), Times.Once);
        userManager.Verify(m => m.FindByEmailAsync("test@demo.com"), Times.Once);
        userManager.Verify(m => m.CheckPasswordAsync(It.IsAny<User>(), "P@ssw0rd!"), Times.Once);
    }
}
