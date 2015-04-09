using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularExamples.Areas.AngularStrap.Controllers
{
    public class ModalController : Controller
    {
        // GET: AngularStrap/Modal
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ModalDemo()
        {
            return PartialView();
        }
    }
}