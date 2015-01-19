using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularExamples.Areas.Basic.Controllers
{
    public class HomeController : Controller
    {
        // GET: Basic/Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FormValidation()
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
    }
}