using System;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using AngularExamples.Areas.DataTables.Models;
using System.Web.Helpers;

namespace AngularExamples
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        //protected void Session_Start(Object sender, EventArgs e)
        //{
        //    string cookieToken, formToken;
        //    AntiForgery.GetTokens(null, out cookieToken, out formToken);
        //    //return cookieToken + formToken;

        //    //var tmp = new TokenKey();
        //    Session["TokenKey"] = cookieToken + formToken;
        //}

        //protected void Application_PostAuthorizeRequest()
        //{
        //    System.Web.HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        //}
    }

}