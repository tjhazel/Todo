# Todo - my twist

A modern full-stack todo web application built with React(Vite), .NET Core(net8.0), and orchestrated using .NET Aspire.

## Architecture Overview

This solution consists of multiple projects orchestrated together using .NET Aspire:

- **Frontend**: React + Vite with SWR for efficient data fetching
- **Backend API**: .NET Core Web API (.NET 8.0) designed as a layer on top of the domain features
- **Domain Layer**: Shared domain models and business logic (.NET 8.0) to allow for easily adding new entry points and creating unit tests
- **Orchestration**: .NET Aspire for local development and deployment 

## Project Structure

```
Solution/
├── Todo/
│   ├── todoUi/                      # React + Vite application
│   │   ├── dist/
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── index.html
│   │   └── vite.config.js
│   ├── Todo.Api/                    # .NET Core Web API
│   │   ├── Controllers/
│   │   ├── Utilties/
│   │   ├── AppBuilder.cs
│   │   ├── Program.cs
│   │   └── Todo.Api.csproj
│   ├── Todo.AppHost/                # Aspire orchestration
│   │   ├── Program.cs
│   │   └── AppHost.csproj
│   ├── Todo.ServiceDefaults/        # Aspire config, tools, telemetry
│   │   ├── Extensions.cs
│   │   └── Todo.ServiceDefaults.csproj
│   ├── TodoCore.Domain/             # Domain models and business logic
│   │   ├── DataAccess/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── TodoCore.Domain.csproj
├── README.md
└── Solution.sln
```

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/)
- [.NET Aspire workload](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/setup-tooling)

### Install .NET Aspire Workload

```bash
dotnet workload update
dotnet workload install aspire
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```
### 2. Run the Aspire project

The easiest way to run the entire solution is through the Aspire AppHost:

```bash
cd Todo/Todo.AppHost
dotnet run
```

This will start:
- The React frontend (typically on `http://localhost:3000`)
- The .NET Core Web API (typically on `https://localhost:7263` and `http://localhost:5259`)
- The Aspire dashboard for monitoring and management

### 4. Access the Application

- **Frontend**: `http://localhost:3000`
- **API**: `http://localhost:5259`
- **Aspire Dashboard**: `http://localhost:17136` (check console output for exact URL)

### 5. For a better development experience - open the solution in Visual Studio

- **Todo.AppHost**: set `Todo.AppHost` project as the startup project
- **f5**: Run solution - *should* launch aspire dashboard with api and ui (with hot reloading)

### 6. Alternatively - open the solution in Visual Studio and use CSCode for the UI

- **Visual Studio**: set `Todo.Api` project as the startup project and run to launch the swagger page of the UI
- **VSCode**: open the todoUI folder in vscode and run `npm run dev` 

## Development

### Frontend Development

The frontend uses Vite for fast development and SWR for data fetching:

```bash
cd src/Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Development

The Web API is built with .NET Core 8.0:

```bash
cd Todo/todoUi
dotnet run           # Run the API
dotnet build         # Build the project
dotnet test          # Run tests (if any)
```

### Key Technologies

#### Frontend
- **React**: kept it minimal with and somewhat unopinionated
- **Vite**: Build tool and development server
- **SWR**: Data fetching library with caching, revalidation, and error handling
   - Created super lightweight fetch wrapper for this sample
- **TypeScript**: Type safety for developer productivity and overall piece of mind
- **Backlog**: Next steps
   - Would typically pull in a framework like a SemanticUI, AntDesign, or the flavor of the day that achievies current design descions
   - Forms: Formik or React Hook Forms with yup for validation 
   - Auth: used MSAL, Auth0, and custom token providers in the past, but should be able to work in most providers.
   - HttpClient: Would likely create a context wrapper to support easily pulling access tokens

#### Backend
- **.NET Core 8.0**: Web API framework
- **Entity Framework Core**: ORM
   - *InMemory* provider loaded from WebApi to keep domain tier from extraneous dependencies
   - *OnModelCreating** loads seed data - not a great live patten, but great for preloading demo data
- **Swagger/OpenAPI**: API documentation & to execute api calls

#### Orchestration
- **.NET Aspire**: Local orchestration and cloud deployment
   - *AddNpmApp* was the path to a clean aspire dashboard
   - *AddViteApp* could not get past Vite assigning a new ui port, which blows up CORS

## SWR Data Fetching

The frontend uses SWR for efficient data fetching. The fetcher in use is a very simple abstraction. In a live situation would likely leverage a context with the token provider to more easily add bearer tokens and handle common fetch tasks.

Example usage:

```javascript
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  return <div>Hello {data.name}!</div>
}
```

## API Endpoints

API endpoints:

```
POST   /api/todoitem              # Create new todoitem
GET    /api/todoitem              # Get all todo item
GET    /api/todoitem/{id}         # Get todoitem by ID - unused in this sample
PUT    /api/todoitem              # Update todoitem
DELETE /api/todoitem/{id}         # Delete todoitem
```

## Configuration

### Environment Variables

Create appropriate configuration files:

#### todoUI (.env)
```
VITE_API_BASE_URL=http://localhost:3000
```

## Deployment

### Using .NET Aspire

Aspire simplifies deployment to various cloud platforms:

```bash
# Deploy to Azure Container Apps
azd up

# Or deploy to other supported platforms
dotnet publish
```

### Manual Deployment

#### Frontend
```bash
cd todo/todoUi
npm run build
# Deploy dist/ folder to your hosting service
```

#### Backend
```bash
cd todo/Todo.Api
dotnet publish -c Release
# Deploy published files to your hosting service
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Follow established coding standards for both C# and JavaScript/TypeScript
- Write unit tests for business logic
- Use meaningful commit messages
- Update documentation for new features
- Ensure all projects build successfully before submitting PRs

## Troubleshooting

### Common Issues

1. **Port conflicts**: Check if ports 3000, 7263, or 5259 are already in use
2. **Node modules**: Try deleting `node_modules` and running `npm install` again
3. **Aspire workload**: Ensure the Aspire workload is installed with `dotnet workload list`

### Useful Commands

```bash
# Clean and rebuild everything
dotnet clean && dotnet build

# Reset frontend dependencies
cd todo/todoUi && rm -rf node_modules package-lock.json && npm install

# View Aspire logs
dotnet run --project todo/Todo.AppHost -- --verbose
```

## License

This project is licensed under the [MIT License](LICENSE).

## Support

For questions and support, please open an issue in the repository or contact the development team.
