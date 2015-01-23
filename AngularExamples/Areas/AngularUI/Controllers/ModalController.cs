using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularExamples.Areas.AngularUI.Controllers
{
    public class ModalController : Controller
    {
        // GET: AngularUI/Modal
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Modal()
        {
            return PartialView();
        }

        public ActionResult ngDialog()
        {
            return View();
        }

        public ActionResult ngDialogModal()
        {
            return PartialView();
        }
    }
}