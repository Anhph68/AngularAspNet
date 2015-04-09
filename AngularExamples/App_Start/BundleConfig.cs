using System.Web.Optimization;

namespace AngularExamples
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-sanitize.js",
                "~/Scripts/i18n/angular-locale_vi-vn.js"));

            // datatable
            bundles.Add(new ScriptBundle("~/bundles/datatable").Include(
                "~/Scripts/angular-datatables/jquery.dataTables.js",
                "~/Scripts/angular-datatables/angular-datatables.js",
                "~/Scripts/angular-datatables/angular-datatables.bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/datatable").Include(
                "~/Content/angular-datatables/datatables.bootstrap.min.css"));

            // fontawesome
            bundles.Add(new StyleBundle("~/Content/fontawesome").Include(
                "~/Content/css/font-awesome.css"));

            // angular-strap
            bundles.Add(new ScriptBundle("~/bundles/angular-strap").Include(
                      "~/Scripts/angular-strap.js",
                      "~/Scripts/angular-strap.tpl.js"));

            // ui-bootstrap
            bundles.Add(new ScriptBundle("~/bundles/ui-bootstrap").Include(
                "~/Scripts/angular-ui/ui-bootstrap.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js"));

            // angular-extra
            bundles.Add(new StyleBundle("~/Content/angular-extra").Include(
                "~/Content/angular-motion.css",
                "~/Content/bootstrap-additions.css"));
        }
    }
}