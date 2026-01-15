using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auction_Clock___SE2_Klas4_Groep6.Controllers;
using Auction_Clock___SE2_Klas4_Groep6.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

public class ProductsControllerUnitTests
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

    [Fact]
    public async Task GetProducts_ReturnsOk_WithSeededProducts_AndAuctionIncluded()
    {
        // Arrange
        var db = CreateDb(nameof(GetProducts_ReturnsOk_WithSeededProducts_AndAuctionIncluded));

        var auction = new Auction
        {
            AuctioneerId = "user-1",
            StartTime = DateTime.UtcNow.AddHours(1),
            EndTime = DateTime.UtcNow.AddHours(2)
        };

        db.Auctions.Add(auction);

        db.Products.AddRange(
            new Product
            {
                ProductId = 1,
                Name = "Mock Product 1",
                Description = "Mock Desc 1",
                MinimumPrice = 10,
                StartPrice = 12,
                AuctionDate = DateTime.UtcNow.Date,
                CompanyId = 1,
                ImagePath = "/img/mock1.jpg",
                Auction = auction
            },
            new Product
            {
                ProductId = 2,
                Name = "Mock Product 2",
                Description = "Mock Desc 2",
                MinimumPrice = 20,
                StartPrice = 25,
                AuctionDate = DateTime.UtcNow.Date,
                CompanyId = 1,
                ImagePath = "/img/mock2.jpg"
            }
        );

        await db.SaveChangesAsync();

        var userManager = CreateUserManagerMock();
        var sut = new ProductsController(db, userManager.Object);

        // Act
        var result = await sut.GetProducts();

        // Assert
        var ok = Assert.IsType<OkObjectResult>(result);

        // Ok(...) bevat object -> cast naar List<Product>
        var products = Assert.IsAssignableFrom<List<Product>>(ok.Value);

        Assert.Equal(2, products.Count);
        Assert.Contains(products, p => p.Name == "Mock Product 1");
        Assert.Contains(products, p => p.Name == "Mock Product 2");

        // Bewijs dat Include(p => p.Auction) werkte voor product 1
        Assert.True(products.Any(p => p.ProductId == 1 && p.Auction != null));
    }

    [Fact]
    public async Task GetProduct_Existing_ReturnsOk_WithProduct()
    {
        // Arrange
        var db = CreateDb(nameof(GetProduct_Existing_ReturnsOk_WithProduct));

        db.Products.Add(new Product
        {
            ProductId = 1,
            Name = "Mock Product 1",
            Description = "Mock Desc 1",
            MinimumPrice = 10,
            StartPrice = 12,
            AuctionDate = DateTime.UtcNow.Date,
            CompanyId = 1,
            ImagePath = "/img/mock1.jpg"
        });

        await db.SaveChangesAsync();

        var userManager = CreateUserManagerMock();
        var sut = new ProductsController(db, userManager.Object);

        // Act
        var result = await sut.GetProduct(1);

        // Assert
        var ok = Assert.IsType<OkObjectResult>(result);
        var product = Assert.IsType<Product>(ok.Value);

        Assert.Equal(1, product.ProductId);
        Assert.Equal("Mock Product 1", product.Name);
        Assert.Equal("/img/mock1.jpg", product.ImagePath);
    }

    [Fact]
    public async Task GetProduct_Unknown_ReturnsNotFound()
    {
        // Arrange
        var db = CreateDb(nameof(GetProduct_Unknown_ReturnsNotFound));

        var userManager = CreateUserManagerMock();
        var sut = new ProductsController(db, userManager.Object);

        // Act
        var result = await sut.GetProduct(999);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }
}
