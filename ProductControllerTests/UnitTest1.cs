using Auction_Clock___SE2_Klas4_Groep6.Controllers;
using Auction_Clock___SE2_Klas4_Groep6.Models;
using AuctionClock.Api.Models.DTO_s;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace AuctionClockTests
{
    public class ProductControllerTests
    {
        // InMemory neppe database

        private AppDbContext CreateInMemoryContext(string dbName)
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            return new AppDbContext(options);
        }

        private ProductsController CreateController(AppDbContext context)
        {
            return new ProductsController(context);
        }

        // GET: api/products test

        [Fact]
        public async Task GetProducts_ReturnsOk_WithAllProducts()
        {
            // Arrange
            var context = CreateInMemoryContext(nameof(GetProducts_ReturnsOk_WithAllProducts));
            context.Products.AddRange(
                new Product
                {
                    Name = "P1",
                    Description = "D1",
                    StartPrice = 10,
                    MinimumPrice = 20,
                    AuctionDate = DateTime.Today,
                    Company = 1
                },
                new Product
                {
                    Name = "P2",
                    Description = "D2",
                    StartPrice = 30,
                    MinimumPrice = 40,
                    AuctionDate = DateTime.Today,
                    Company = 1
                }
            );
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            // Act
            var result = await controller.GetProducts();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var products = Assert.IsAssignableFrom<IEnumerable<Product>>(okResult.Value);
            var list = new List<Product>(products);

            Assert.Equal(2, list.Count);
            Assert.Equal("P1", list[0].Name);
            Assert.Equal("P2", list[1].Name);
        }

        // GET: api/products/{id} test

        [Fact]
        public async Task GetProduct_ProductExists_ReturnsOkWithProduct()
        {
            // Arrange
            var context = CreateInMemoryContext(nameof(GetProduct_ProductExists_ReturnsOkWithProduct));
            var product = new Product
            {
                Name = "Existing",
                Description = "Desc",
                StartPrice = 10,
                MinimumPrice = 20,
                AuctionDate = DateTime.Today,
                Company = 1
            };
            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            // Act
            var result = await controller.GetProduct(product.ProductId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedProduct = Assert.IsType<Product>(okResult.Value);

            Assert.Equal(product.ProductId, returnedProduct.ProductId);
            Assert.Equal("Existing", returnedProduct.Name);
        }

        [Fact]
        public async Task GetProduct_ProductNotFound_ReturnsNotFound()
        {
            // Arrange
            var context = CreateInMemoryContext(nameof(GetProduct_ProductNotFound_ReturnsNotFound));
            var controller = CreateController(context);

            // Act
            var result = await controller.GetProduct(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        // POST: api/products/create-product test

        [Fact]
        public async Task CreateProduct_ValidDto_CreatesProductAndReturnsOk()
        {
            // Arrange
            var context = CreateInMemoryContext(nameof(CreateProduct_ValidDto_CreatesProductAndReturnsOk));
            var controller = CreateController(context);

            var dto = new ProductaddDTO
            {
                Name = "NewProduct",
                Description = "Desc",
                StartPrice = 10.5m,
                MinimumPrice = 20.0m,
                AuctionDate = new DateTime(2025, 1, 1, 12, 30, 0),
                Company = 5
            };

            // Act
            var result = await controller.CreateProduct(dto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var product = Assert.IsType<Product>(okResult.Value);

            Assert.Equal("NewProduct", product.Name);
            Assert.Equal("Desc", product.Description);
            Assert.Equal(10.5m, product.StartPrice);
            Assert.Equal(20.0m, product.MinimumPrice);
            Assert.Equal(new DateTime(2025, 1, 1), product.AuctionDate); // tijd afgesneden
            Assert.Equal(5, product.Company);

            var saved = await context.Products.FirstOrDefaultAsync(p => p.ProductId == product.ProductId);
            Assert.NotNull(saved);
        }

        // POST: api/products/upload-photo test

        [Fact]
        public async Task UploadPhoto_ProductNotFound_ReturnsNotFound()
        {
            // Arrange
            var context = CreateInMemoryContext(nameof(UploadPhoto_ProductNotFound_ReturnsNotFound));
            var controller = CreateController(context);

            var fileMock = CreateMockFormFile("test.jpg", "image/jpeg", "fakecontent");

            // Act
            var result = await controller.UploadPhoto(123, fileMock.Object);

            // Assert
            var notFound = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("Product niet gevonden", notFound.Value);
        }

        [Fact]
        public async Task UploadPhoto_ProductFound_SavesFileAndUpdatesImagePath()
        {
            // Arrange
            var context = CreateInMemoryContext(nameof(UploadPhoto_ProductFound_SavesFileAndUpdatesImagePath));
            var product = new Product
            {
                Name = "PhotoProduct",
                Description = "D",
                StartPrice = 1,
                MinimumPrice = 2,
                AuctionDate = DateTime.Today,
                Company = 1
            };
            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            // tijdelijke root 
            var tempRoot = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString("N"));
            Directory.CreateDirectory(tempRoot);
            var originalDirectory = Directory.GetCurrentDirectory();
            Directory.SetCurrentDirectory(tempRoot);

            try
            {
                var fileMock = CreateMockFormFile("photo.png", "image/png", "image-data");

                // Act
                var result = await controller.UploadPhoto(product.ProductId, fileMock.Object);

                // Assert
                var okResult = Assert.IsType<OkObjectResult>(result);
                var imagePath = Assert.IsType<string>(okResult.Value);

                Assert.StartsWith("/img/", imagePath);

                var physicalPath = Path.Combine(
                    tempRoot,
                    "wwwroot",
                    imagePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar)
                );
                Assert.True(File.Exists(physicalPath));

                var updated = await context.Products.FindAsync(product.ProductId);
                Assert.Equal(imagePath, updated!.ImagePath);
            }
            finally
            {
                Directory.SetCurrentDirectory(originalDirectory);
                if (Directory.Exists(tempRoot))
                {
                    Directory.Delete(tempRoot, recursive: true);
                }
            }
        }

        //  mockobject
        private Mock<IFormFile> CreateMockFormFile(string fileName, string contentType, string content)
        {
            var fileMock = new Mock<IFormFile>();

            var ms = new MemoryStream();
            var writer = new StreamWriter(ms);
            writer.Write(content);
            writer.Flush();
            ms.Position = 0;

            fileMock.Setup(f => f.FileName).Returns(fileName);
            fileMock.Setup(f => f.Length).Returns(ms.Length);
            fileMock.Setup(f => f.ContentType).Returns(contentType);

            fileMock
                .Setup(f => f.CopyToAsync(It.IsAny<Stream>(), It.IsAny<CancellationToken>()))
                .Returns<Stream, CancellationToken>((target, token) =>
                {
                    ms.Position = 0;
                    return ms.CopyToAsync(target, token);
                });

            return fileMock;
        }

        // POST: api/products/create-auction-time

        [Fact]
        public async Task CreateAuctionTime_ProductNotFound_ReturnsNotFound()
        {
            // Arrange
            var context = CreateInMemoryContext(nameof(CreateAuctionTime_ProductNotFound_ReturnsNotFound));
            var controller = CreateController(context);

            var dto = new AuctionTimeDTO
            {
                StartTime = DateTime.UtcNow,
                EndTime = DateTime.UtcNow.AddHours(1),
                Auctioneer = 1
            };

            // Act
            var result = await controller.CreateAuctionTime(999, dto);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task CreateAuctionTime_ProductFound_CreatesAuctionAndReturnsOk()
        {
            // Arrange
            var context = CreateInMemoryContext(nameof(CreateAuctionTime_ProductFound_CreatesAuctionAndReturnsOk));
            var product = new Product
            {
                Name = "AuctionProduct",
                Description = "D",
                StartPrice = 10,
                MinimumPrice = 20,
                AuctionDate = DateTime.Today,
                Company = 1
            };
            context.Products.Add(product);
            await context.SaveChangesAsync();

            var controller = CreateController(context);

            var start = new DateTime(2025, 1, 1, 10, 0, 0);
            var end = new DateTime(2025, 1, 1, 11, 0, 0);

            var dto = new AuctionTimeDTO
            {
                StartTime = start,
                EndTime = end,
                Auctioneer = 2
            };

            // Act
            var result = await controller.CreateAuctionTime(product.ProductId, dto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var auction = Assert.IsType<Auction>(okResult.Value);

            Assert.Equal(start, auction.StartTime);
            Assert.Equal(end, auction.EndTime);
            Assert.Equal(2, auction.Auctioneer);

            var savedAuction = await context.Auctions.FirstOrDefaultAsync(a => a.AuctionId == auction.AuctionId);
            Assert.NotNull(savedAuction);
        }
    }
}
