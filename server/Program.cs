internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddControllers();
        builder.Services.AddCors(options =>
        {
#if DEBUG
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins().AllowAnyOrigin();
                });
#else
            // TODO: No idea if this works from the actual website
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins("https://pipmon.com");
                });
#endif
        });
        var app = builder.Build();

        app.MapControllers();
        app.UseCors();
        app.Run();
    }
}