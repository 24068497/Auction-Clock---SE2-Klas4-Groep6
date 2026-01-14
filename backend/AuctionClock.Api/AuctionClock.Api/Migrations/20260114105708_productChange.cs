using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionClock.Api.Migrations
{
    /// <inheritdoc />
    public partial class productChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_company_Company",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Company",
                table: "Products",
                newName: "CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_Company",
                table: "Products",
                newName: "IX_Products_CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_company_CompanyId",
                table: "Products",
                column: "CompanyId",
                principalTable: "company",
                principalColumn: "companyid",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_company_CompanyId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "CompanyId",
                table: "Products",
                newName: "Company");

            migrationBuilder.RenameIndex(
                name: "IX_Products_CompanyId",
                table: "Products",
                newName: "IX_Products_Company");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_company_Company",
                table: "Products",
                column: "Company",
                principalTable: "company",
                principalColumn: "companyid",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
