using System.Web.Mvc;

namespace AngularExamples.Areas.Basic.Controllers
{
    public class SinglePageController : Controller
    {
        // GET: Basic/Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SinglePage()
        {
            return View();
        }

        public ActionResult Home()
        {
            return PartialView();
        }

        public ActionResult About()
        {
            return PartialView();
        }

        public ActionResult Contact()
        {
            return PartialView();
        }

        public ActionResult Table()
        {
            return PartialView();
        }

        public ActionResult List()
        {
            return PartialView();
        }
    }
}