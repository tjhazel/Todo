var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.Todo_Api>("todo-api")
   .WithExternalHttpEndpoints()
;

////shows the correct port on dashboard, but console logs show a random port.  
//var ui = builder.AddViteApp(name: "todo-ui", workingDirectory: "../todoUi")
//   .WithHttpEndpoint(port: 3000, name: "frontend", env: "PORT")
//   .WithExternalHttpEndpoints()
//   .WithReference(api)
//   .WaitFor(api)
//   .WithNpmPackageInstallation()
//   ;

//produces a clean startup dashboard
var ui = builder.AddNpmApp(name: "todo-ui", workingDirectory: "../todoUi", scriptName: "dev")
    .WithHttpEndpoint(port: 3000, env: "PORT")
    .WithExternalHttpEndpoints()
    .WithReference(api)
    .WaitFor(api);

builder.Build().Run();
