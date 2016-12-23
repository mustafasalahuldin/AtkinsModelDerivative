using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AtkinsModelDerivative.Startup))]
namespace AtkinsModelDerivative
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
