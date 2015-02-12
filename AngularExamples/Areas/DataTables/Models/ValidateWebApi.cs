using System;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Helpers;
using System.Web.Http.Filters;

namespace AngularExamples.Areas.DataTables.Models
{
    //public class TokenKey
    //{
    //    public string GetAntiForgeryToken()
    //    {
    //        string cookieToken, formToken;
    //        AntiForgery.GetTokens(null, out cookieToken, out formToken);
    //        return cookieToken + formToken;
    //    }
    //}

    public class CustomAuthorizeAttribute : ActionFilterAttribute
    {
        //public string TokenKey { get; set; }

        //public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
        //{
        //    var headers = actionContext.Request.Headers;
        //    var tokenFromHeader = headers.GetValues("RequestVerificationToken").FirstOrDefault();
        //    //var tokenServer = HttpContext.Current.Session["TokenKey"];
        //    var tmp = HttpContext.Current.Session["TokenKey"];
        //    //var test = tmp.Session["TokenKey"];

        //    base.OnActionExecuting(actionContext);
        //}

        public override System.Threading.Tasks.Task OnActionExecutingAsync(System.Web.Http.Controllers.HttpActionContext actionContext, System.Threading.CancellationToken cancellationToken)
        {

            var headers = actionContext.Request.Headers;
            var tokenFromHeader = headers.GetValues("RequestVerificationToken").FirstOrDefault();
            var tmp = HttpContext.Current.Session["TokenKey"];

            return base.OnActionExecutingAsync(actionContext, cancellationToken);
        }
    }
}