using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularExamples.Startup))]
namespace AngularExamples
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
