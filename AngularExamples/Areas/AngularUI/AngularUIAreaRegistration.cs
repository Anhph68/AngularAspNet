using System.Web.Mvc;

namespace AngularExamples.Areas.AngularUI
{
    public class AngularUIAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AngularUI";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AngularUI_default",
                "AngularUI/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}