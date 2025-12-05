# Pro Mantrix – Collaborative Project Management Tool

## 1. Project Title
**Pro Mantrix**

## 2. Problem Statement
Efficient project management and team collaboration are critical for success but often hindered by fragmented tools. Pro Mantrix provides a unified workspace where teams can manage projects, track tasks, and collaborate seamlessly in real-time. It solves the problem of scattered information by centralizing workspaces, projects, and tasks with robust role-based access control.

## 3. System Architecture
**Frontend** → **Backend (API)** → **Database**

### Tech Stack
*   **Frontend**: React (Vite), TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, Zustand, React Hook Form.
*   **Backend**: Node.js, Express.js, TypeScript, Passport.js.
*   **Database**: MongoDB (Mongoose ODM).
*   **Authentication**: JWT-based (JSON Web Tokens) with Passport.js (Local & Google OAuth).

### Deployment
*   **Frontend**: Vercel (Recommended)
*   **Backend**: Render / Railway (Recommended)
*   **Database**: MongoDB Atlas

## 4. Key Features
| Category | Features |
| :--- | :--- |
| **Authentication** | Secure Login/Signup (Email & Google OAuth), Session Management, JWT Security. |
| **Workspace Mgmt** | Create/Edit/Delete Workspaces, Switch between multiple workspaces. |
| **Project Mgmt** | Create Projects within workspaces, Edit details, Analytics per project. |
| **Task Mgmt** | Create/Edit/Delete Tasks, Assign members, Set Priority (Low/Medium/High/Urgent) & Status (Todo/In Progress/Done), Due Dates. |
| **Member Mgmt** | Invite members via code, Role-based permissions (Owner, Admin, Member), Remove members. |
| **Analytics** | Dashboard overview of task completion, overdue tasks, and project progress. |
| **UI/UX** | Dark/Light mode, Responsive design, Skeleton loaders, Toast notifications. |

## 5. CRUD Implementation & API Overview
All protected routes require a valid JWT Token in the Authorization header or Cookie.

### Authentication
*   `POST /api/auth/register`: Register new user.
*   `POST /api/auth/login`: Login and receive JWT.
*   `POST /api/auth/logout`: Clear session.
*   `GET /api/auth/google`: Initiate Google OAuth.

### Workspace CRUD
*   **Create**: `POST /api/workspace/create/new` - Create a new workspace.
*   **Read**: `GET /api/workspace/all` - Get all workspaces user is a member of.
*   **Read**: `GET /api/workspace/:workspaceId` - Get details of a specific workspace.
*   **Update**: `PUT /api/workspace/update/:workspaceId` - Update workspace details.
*   **Delete**: `DELETE /api/workspace/delete/:workspaceId` - Delete workspace (Owner only).
*   **Analytics**: `GET /api/workspace/analytics/:workspaceId` - Get workspace statistics.

### Project CRUD
*   **Create**: `POST /api/project/workspace/:workspaceId/create` - Create a new project.
*   **Read**: `GET /api/project/workspace/:workspaceId/all` - Get all projects with pagination.
*   **Update**: `PUT /api/project/:projectId/workspace/:workspaceId/update` - Edit project.
*   **Delete**: `DELETE /api/project/:projectId/workspace/:workspaceId/delete` - Delete project.

### Task CRUD
*   **Create**: `POST /api/task/project/:projectId/workspace/:workspaceId/create` - Create a new task.
*   **Read**: `GET /api/task/workspace/:workspaceId/all` - Get tasks with filtering and pagination.
*   **Update**: `PUT /api/task/:taskId/project/:projectId/workspace/:workspaceId/update` - Update task status/priority.
*   **Delete**: `DELETE /api/task/:taskId/workspace/:workspaceId/delete` - Delete task.

### Member Management
*   **Invite**: `POST /api/member/workspace/:inviteCode/join` - Join workspace via code.
*   **Read**: `GET /api/workspace/members/:workspaceId` - List all members and their roles.
*   **Update**: `PUT /api/workspace/change/member/role/:workspaceId` - Change member role (Admin/Owner only).

## 6. Advanced Data Handling

### Pagination
To ensure optimal performance, lists of projects and tasks are paginated.
*   **Projects**: Fetches projects in batches (default page size: 10).
*   **Tasks**: Supports cursor-based or offset-based pagination to handle large task lists efficiently.

### Searching & Filtering
*   **Tasks**: Users can filter tasks by:
    *   **Keyword**: Search title/description.
    *   **Priority**: Filter by Low, Medium, High, Urgent.
    *   **Status**: Filter by Todo, In Progress, Done.
    *   **Assignee**: Filter tasks assigned to specific members.
    *   **Project**: Filter tasks belonging to a specific project.

### Role-Based Access Control (RBAC)
The system implements granular permissions:
*   **Owner**: Full access to workspace, can delete workspace, manage all roles.
*   **Admin**: Can manage projects, tasks, and members, but cannot delete the workspace.
*   **Member**: Can view and work on tasks, create tasks (if allowed), but has limited administrative privileges.

## 7. How It Works (Flow)
1.  **User Registration**: User signs up via Email or Google. A default "My Workspace" is created for them.
2.  **Workspace Setup**: User creates a new workspace or joins an existing one using an invite code.
3.  **Project Creation**: Inside the workspace, the user creates a "Marketing Campaign" project.
4.  **Task Assignment**: User creates a task "Design Banner", sets priority to "High", assigns it to a team member, and sets a due date.
5.  **Collaboration**: The assigned member sees the task in their dashboard, moves it to "In Progress", and completes it.
6.  **Tracking**: The Workspace Owner views the Analytics dashboard to see project progress and team velocity.
