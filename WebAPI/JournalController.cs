using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ATRAVELOGGIA_MVC.WebAPI
{
    public class JournalController : ApiController
    {
        private traveloggiaDBEntities db = new traveloggiaDBEntities();

         //GET api/Site/5
        //public IEnumerable<Site> GetSites(int id)
        //{
        //    return db.Sites.Where(s => s.MapID == id).AsEnumerable();//.Include(s=>s.Photos);

        //}


        // GET api/Site
        //public IEnumerable<Site> GetSites()
        //{
        //    return db.Sites.AsEnumerable();
        //}

        // GET api/Journal/5
        public Journal GetJournal(int id)
        {
            Journal mag = db.Journals.Where(j => j.SiteID == id).SingleOrDefault();
            if (mag == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return mag;
        }


      

        // PUT api/Site/5
        public HttpResponseMessage PutJournal(int id, Journal mag)
        {
            if (ModelState.IsValid && id == mag.JournalID)
            {
                db.Entry(mag).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/Site
        public HttpResponseMessage PostJournal(Journal mag)
        {
            if (ModelState.IsValid)
            {
                db.Journals.Add(mag);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, mag);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = mag.JournalID }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Site/5
        public HttpResponseMessage DeleteJournal(int id)
        {
            Journal mag = db.Journals.Find(id);
            if (mag == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Journals.Remove(mag);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, mag);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}