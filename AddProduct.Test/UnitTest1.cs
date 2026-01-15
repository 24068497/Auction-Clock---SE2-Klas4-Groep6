using Moq;
using Auction_Clock___SE2_Klas4_Groep6.Models;
using Auction_Clock___SE2_Klas4_Groep6.Services;


public class ProductServiceTests
{
    [Fact]
    public void VoegProductToe_MockProduct_Slaagt()
    {
        var mockRepo = new Mock<IProductRepository>();
        var service = new ProductService(mockRepo.Object);

        var product = new Product
        {
            Name = "Rozen",
            StartPrice = 50,
            MinimumPrice = 30,
            AuctionDate = DateTime.Now.AddDays(1),
            Company = 1
        };

        mockRepo.Setup(r => r.Add(It.IsAny<Product>())).Returns(product);
        
        var resultaat = service.VoegProductToe(product);
        
        Assert.NotNull(resultaat);
        Assert.Equal("Rozen", resultaat.Name);
        mockRepo.Verify(r => r.Add(product), Times.Once);
    }

    [Fact]
    public void VoegProductToe_MinPriceGroterDanStartPrice_ThrowsException()
    {
        var mockRepo = new Mock<IProductRepository>();
        var service = new ProductService(mockRepo.Object);

        var product = new Product
        {
            Name = "Tulpen",
            StartPrice = 40,
            MinimumPrice = 50,
            AuctionDate = DateTime.Now.AddDays(1),
            Company = 1
        };
        
        var ex = Assert.Throws<ArgumentException>(() => service.VoegProductToe(product));
        Assert.Equal("Minimumprijs mag niet hoger zijn dan startprijs.", ex.Message);
    }

    [Fact]
    public void VoegProductToe_VeilingDatumInVerleden_ThrowsException()
    {
        var mockRepo = new Mock<IProductRepository>();
        var service = new ProductService(mockRepo.Object);

        var product = new Product
        {
            Name = "Gerbera",
            StartPrice = 50,
            MinimumPrice = 30,
            AuctionDate = DateTime.Now.AddDays(-1),
            Company = 1
        };
        
        var ex = Assert.Throws<ArgumentException>(() => service.VoegProductToe(product));
        Assert.Equal("Veilingdatum mag niet in het verleden liggen.", ex.Message);
    }
}
 