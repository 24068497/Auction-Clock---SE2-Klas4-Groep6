using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Auction_Clock___SE2_Klas4_Groep6.Controllers;
using Auction_Clock___SE2_Klas4_Groep6.Models;
using AuctionClock.Api.Models.DTO_s;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

public class ProductsControllerActionTests
{
    private static AppDbContext CreateDb(string dbName)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(dbName)
            .Options;

        return new AppDbContext(options);
    }

    private static Mock<UserManager<User>> CreateUserManagerMock()
    {
        var store = new Mock<IUserStore<User>>();
        return new Mock<UserManager<User>>(
            store.Object,
            null!, null!, null!, null!, null!, null!, null!, null!
        );
    }

    private static ProductsController CreateSutWithUser(
        AppDbContext db,
        UserManager<User> userManager,
        string userId)
    {
        var sut = new ProductsController(db, userManager);

        var identity = new ClaimsIdentity(new[]
        {
            // Controller pakt NameIdentifier of sub //
            new Claim(ClaimTypes.NameIdentifier, userId)
        }, "TestAuth");

        sut.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(identity)
            }
        };

        return sut;
    }

    [Fact]
    public async Task CreateAuctionTime_StartPriceBelowMinimum_ReturnsBadRequest()
    {
        // Arrange //
        var db = CreateDb(nameof(CreateAuctionTime_StartPriceBelowMinimum_ReturnsBadRequest));

        db.Products.Add(new Product
        {
            ProductId = 10,
            Name = "P",
            Description = "D",
            MinimumPrice = 100,
            StartPrice = 0,
            AuctionDate = DateTime.UtcNow.Date,
            CompanyId = 1
        });

        await db.SaveChangesAsync();

        var userManagerMock = CreateUserManagerMock();
        userManagerMock
            .Setup(m => m.FindByIdAsync("user-1"))
            .ReturnsAsync(new User { Id = "user-1", CompanyId = 1 });

        var sut = CreateSutWithUser(db, userManagerMock.Object, "user-1");

        var dto = new AuctionTimeDTO
        {
            StartTime = DateTime.UtcNow.AddHours(1),
            EndTime = DateTime.UtcNow.AddHours(2),
            StartPrice = 50 // lager dan MinimumPrice (100) //
        };

        // Act //
        var result = await sut.CreateAuctionTime(10, dto);

        // Assert //
        var bad = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Startprijs mag niet lager zijn dan minimumprijs.", bad.Value);

        // Extra: er mag geen auction zijn aangemaakt //
        Assert.Equal(0, await db.Auctions.CountAsync());
    }

    [Fact]
    public async Task CreateProduct_ValidClaim_SavesProductWithCompanyId_AndReturnsOk()
    {
        // Arrange //
        var db = CreateDb(nameof(CreateProduct_ValidClaim_SavesProductWithCompanyId_AndReturnsOk));

        var userManagerMock = CreateUserManagerMock();
        userManagerMock
            .Setup(m => m.FindByIdAsync("user-123"))
            .ReturnsAsync(new User
            {
                Id = "user-123",
                CompanyId = 42,
                Email = "x@y.com"
            });

        var sut = CreateSutWithUser(db, userManagerMock.Object, "user-123");

        var dto = new ProductaddDTO
        {
            Name = "Mock Product",
            Description = "Mock Desc",
            MinimumPrice = 10,
            AuctionDate = new DateTime(2026, 01, 15, 13, 45, 00) // tijddeel moet weg
        };

        // Act //
        var result = await sut.CreateProduct(dto);

        // Assert //
        var ok = Assert.IsType<OkObjectResult>(result);
        var returned = Assert.IsType<Product>(ok.Value);

        Assert.Equal("Mock Product", returned.Name);
        Assert.Equal("Mock Desc", returned.Description);
        Assert.Equal(10, returned.MinimumPrice);

        // CompanyId komt van user //
        Assert.Equal(42, returned.CompanyId);

        // StartPrice hardcoded 0 bij create //
        Assert.Equal(0, returned.StartPrice);

        // AuctionDate wordt genormaliseerd naar datum (tijd 00:00:00) //
        Assert.Equal(dto.AuctionDate.Date, returned.AuctionDate);

        // En hij moet echt in de DB staan //
        var saved = await db.Products.SingleAsync(p => p.Name == "Mock Product");
        Assert.Equal(42, saved.CompanyId);
        Assert.Equal(0, saved.StartPrice);
        Assert.Equal(dto.AuctionDate.Date, saved.AuctionDate);

        // Verify FindByIdAsync is gebruikt //
        userManagerMock.Verify(m => m.FindByIdAsync("user-123"), Times.Once);
    }
}
