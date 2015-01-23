using System;
using System.Web.Mvc;

namespace AngularExamples.Areas.DataTables.Controllers
{
    public class AppsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return PartialView();
        }

        public ActionResult Edit()
        {
            return PartialView();
        }

        public ActionResult Delete()
        {
            return PartialView();
        }

        public ActionResult DelConfirm()
        {
            return PartialView();
        }
    }
}
