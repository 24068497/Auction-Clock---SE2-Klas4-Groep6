using Xunit;
using Moq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Auction_Clock___SE2_Klas4_Groep6.Controllers;
using Auction_Clock___SE2_Klas4_Groep6.Models;
using Auction_Clock___SE2_Klas4_Groep6.Models.DTO_s;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Collections.Generic;

public class AuthcontrollerTest
{
    private Mock<UserManager<User>> _mockUserManager;
    private Mock<SignInManager<User>> _mockSignInManager;
    private Mock<RoleManager<IdentityRole>> _mockRoleManager;
    private Mock<IConfiguration> _mockConfig;
    private AuthController _controller;

    public AuthcontrollerTest()
    {
        var userStoreMock = new Mock<IUserStore<User>>();
        _mockUserManager = new Mock<UserManager<User>>(userStoreMock.Object, null, null, null, null, null, null, null, null);

        var contextAccessorMock = new Mock<Microsoft.AspNetCore.Http.IHttpContextAccessor>();
        var userPrincipalFactoryMock = new Mock<IUserClaimsPrincipalFactory<User>>();
        _mockSignInManager = new Mock<SignInManager<User>>(_mockUserManager.Object, contextAccessorMock.Object, userPrincipalFactoryMock.Object, null, null, null, null);

        var roleStoreMock = new Mock<IRoleStore<IdentityRole>>();
        _mockRoleManager = new Mock<RoleManager<IdentityRole>>(roleStoreMock.Object, null, null, null, null);

        _mockConfig = new Mock<IConfiguration>();
        _mockConfig.Setup(c => c["Jwt:Key"]).Returns("ThisIsASecretKeyForTestingPurposes!");
        _mockConfig.Setup(c => c["Jwt:Issuer"]).Returns("TestIssuer");
        _mockConfig.Setup(c => c["Jwt:Audience"]).Returns("TestAudience");

        _controller = new AuthController(_mockUserManager.Object, _mockSignInManager.Object, _mockRoleManager.Object, _mockConfig.Object);
    }
}