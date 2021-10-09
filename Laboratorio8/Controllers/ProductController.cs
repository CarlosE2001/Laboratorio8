
using System.Web.Mvc;
namespace shop_demo_app.Controllers {
    public class ProductsController : Controller {
        private ProductHandler ProductsHandler;
        public ProductsController() {
            ProductsHandler = new ProductHandler();
        }
        public ActionResult Index() {
            return View();
        }
        public JsonResult GetAllProducts() {
            var products = ProductsHandler.GetAll();
            return Json(products, JsonRequestBehavior.AllowGet);
        }
    }
}