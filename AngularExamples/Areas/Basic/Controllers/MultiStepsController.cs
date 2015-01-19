using System.Web.Mvc;

namespace AngularExamples.Areas.Basic.Controllers
{
    public class MultiStepsController : Controller
    {
        // GET: Basic/MultiSteps
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Form()
        {
            return PartialView();
        }

        public ActionResult frmProfile()
        {
            return PartialView();
        }

        public ActionResult frmInterests()
        {
            return PartialView();
        }

        public ActionResult frmPayment()
        {
            return PartialView();
        }
    }
}