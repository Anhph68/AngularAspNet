using System;
using System.Web.Helpers;
using System.Web.Mvc;

namespace AngularExamples.Areas.DataTables.Controllers
{
    public class AppsController : Controller
    {
        public ActionResult Index()
        {
            Session["TokenKey"] = GetAntiForgeryToken();
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

        public string GetAntiForgeryToken()
        {
            string cookieToken, formToken;
            AntiForgery.GetTokens(null, out cookieToken, out formToken);
            return cookieToken + formToken;
        }
    }
}
