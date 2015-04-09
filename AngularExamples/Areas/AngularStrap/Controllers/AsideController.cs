using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularExamples.Areas.AngularStrap.Controllers
{
    public class AsideController : Controller
    {
        // GET: AngularStrap/Aside
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AsideDemo()
        {
            return PartialView();
        }
    }
}