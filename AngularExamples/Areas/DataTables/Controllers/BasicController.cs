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

            var tmpCount = allResult.Count();

            if (!string.IsNullOrEmpty(param.search.value))
            {
                int tmp = int.TryParse(param.search.value, out tmp) ? tmp : 0;

                allResult = allResult
                    .Where(c => param.columns[1].searchable && c.AppName.ToLower().Contains(param.search.value.ToLower())
                             || param.columns[2].searchable && c.AppUrl.ToLower().Contains(param.search.value.ToLower())
                             || param.columns[0].searchable && c.Id.Equals(tmp)
                     );
            }

            Func<tblApp, string> orderFunc1 = 
                (c => param.order[0].column == 1 && param.columns[1].orderable ? c.AppName :
                        param.order[0].column == 2 && param.columns[2].orderable ? c.AppUrl : "");
            Func<tblApp, int> orderFunc2 = (c => param.order[0].column == 0 && param.columns[0].orderable ? c.Id : 0);

            allResult = param.order[0].dir == "asc" ? allResult.OrderBy(orderFunc1).ThenBy(orderFunc2) : allResult.OrderByDescending(orderFunc1).ThenByDescending(orderFunc2);

            var displayed = allResult.Skip(param.start).Take(param.length);


            var result = displayed.Select(c => new
            {
                col0 = c.Id,
                col1 = c.AppName,
                col2 = c.AppUrl
            });

            return Json(new
            {
                draw = param.draw,
                recordsTotal = tmpCount,
                recordsFiltered = allResult.Count(),
                data = result
            }, JsonRequestBehavior.AllowGet);
        }
    }
}