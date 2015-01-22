using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using AngularExamples.Areas.DataTables.Models;

namespace AngularExamples.Areas.DataTables.Controllers
{
    public class tblAppsController : ApiController
    {
        private TDKTEntities db = new TDKTEntities();

        // GET: api/tblApps
        public IQueryable<tblApp> GettblApps()
        {
            return db.tblApps;
        }

        // GET: api/tblApps/5
        [ResponseType(typeof(tblApp))]
        public async Task<IHttpActionResult> GettblApp(int id)
        {
            tblApp tblApp = await db.tblApps.FindAsync(id);
            if (tblApp == null)
            {
                return NotFound();
            }

            return Ok(tblApp);
        }

        // PUT: api/tblApps/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PuttblApp(int id, tblApp tblApp)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblApp.Id)
            {
                return BadRequest();
            }

            db.Entry(tblApp).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblAppExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/tblApps
        [ResponseType(typeof(tblApp))]
        public async Task<IHttpActionResult> PosttblApp(tblApp tblApp)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tblApps.Add(tblApp);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (tblAppExists(tblApp.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tblApp.Id }, tblApp);
        }

        // DELETE: api/tblApps/5
        [ResponseType(typeof(tblApp))]
        public async Task<IHttpActionResult> DeletetblApp(int id)
        {
            tblApp tblApp = await db.tblApps.FindAsync(id);
            if (tblApp == null)
            {
                return NotFound();
            }

            db.tblApps.Remove(tblApp);
            await db.SaveChangesAsync();

            return Ok(tblApp);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblAppExists(int id)
        {
            return db.tblApps.Count(e => e.Id == id) > 0;
        }
    }
}