using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularExamples.Areas.Basic.Controllers
{
    public class RouterAppController : Controller
    {
        // GET: Basic/RouterApp
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Home()
        {
            return PartialView();
        }

        public ActionResult List()
        {
            return PartialView();
        }

        public ActionResult About()
        {
            return PartialView();
        }

        public ActionResult Table()
        {
            return PartialView();
        }
    }
}