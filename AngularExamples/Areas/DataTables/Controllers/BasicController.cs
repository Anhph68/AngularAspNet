using AngularExamples.Areas.DataTables.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;

namespace AngularExamples.Areas.DataTables.Controllers
{
    public class BasicController : Controller
    {
        // GET: DataTables/Basic
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Basic()
        {
            return PartialView();
        }

        public ActionResult LoadJson()
        {
            return PartialView();
        }

        public ActionResult AppList()
        {
            return PartialView();
        }

        private TDKTEntities db = new TDKTEntities();

        public ActionResult GetAppList(DataTableParamModel param)
        {
            IEnumerable<tblApp> allResult = db.tblApps.ToList();

            IEnumerable<tblApp> filtered;
            //Check whether the companies should be filtered by keyword
            //if (!string.IsNullOrEmpty(param.sSearch))
            //{
            //    //Optionally check whether the columns are searchable at all 
            //    var search0 = Convert.ToBoolean(Request["bSearchable_0"]);
            //    var search1 = Convert.ToBoolean(Request["bSearchable_1"]);
            //    var search2 = Convert.ToBoolean(Request["bSearchable_2"]);
            //    int tmp = int.TryParse(param.sSearch, out tmp) ? tmp : 0;

            //    filtered = allResult
            //        .Where(c => search1 && c.AppName.ToLower().Contains(param.sSearch.ToLower())
            //                 || search2 && c.AppUrl.ToLower().Contains(param.sSearch.ToLower())
            //                 || search0 && c.Id.Equals(tmp)
            //         );
            //}
            //else filtered = allResult;

            var tmpCount = allResult.Count();

            if (!string.IsNullOrEmpty(param.sSearch))
            {
                //Optionally check whether the columns are searchable at all 
                var search0 = Convert.ToBoolean(Request["bSearchable_0"]);
                var search1 = Convert.ToBoolean(Request["bSearchable_1"]);
                var search2 = Convert.ToBoolean(Request["bSearchable_2"]);
                int tmp = int.TryParse(param.sSearch, out tmp) ? tmp : 0;

                allResult = allResult
                    .Where(c => search1 && c.AppName.ToLower().Contains(param.sSearch.ToLower())
                             || search2 && c.AppUrl.ToLower().Contains(param.sSearch.ToLower())
                             || search0 && c.Id.Equals(tmp)
                     );
            }

            //var sort0 = Convert.ToBoolean(Request["bSortable_0"]);
            //var sort1 = Convert.ToBoolean(Request["bSortable_1"]);
            //var sort2 = Convert.ToBoolean(Request["bSortable_2"]);
            //var sortColumnIndex = Convert.ToInt64(Request["iSortCol_0"]);

            //Func<tblApp, string> orderingFunction = (c => sortColumnIndex == 1 && sort1 ? c.AppName :
            //                                                sortColumnIndex == 2 && sort2 ? c.AppUrl : "");
            //Func<tblApp, int> orderingFunction2 = (c => sortColumnIndex == 0 && sort0 ? c.Id : 0);

            //var sortDirection = Request["sSortDir_0"]; // asc or desc
            //filtered = sortDirection == "asc" ? filtered.OrderBy(orderingFunction).ThenBy(orderingFunction2) : filtered.OrderByDescending(orderingFunction).ThenByDescending(orderingFunction2);

            //var displayed = filtered.Skip(param.iDisplayStart).Take(param.iDisplayLength);


            var result = allResult.Select(c => new
            {
                col0 = c.Id,
                col1 = c.AppName,
                col2 = c.AppUrl
            });

            return Json(new
            {
                sEcho = param.sEcho,
                iTotalRecords = allResult.Count(),
                iTotalDisplayRecords = allResult.Count(),
                aaData = result
            }, JsonRequestBehavior.AllowGet);
        }
    }
}