#  LiveOps AI Dashboard

### AI-Powered Real-Time Operations & Data Streaming Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-3.x-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)](https://kafka.apache.org/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)


*A full-stack, cloud-native platform that ingests high-velocity event streams, applies AI-driven analytics, and surfaces real-time operational intelligence through an interactive dashboard.*

[Features](#-key-features) · [Architecture](#-system-architecture) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Docs](#-api-layer) · [Deployment](#-deployment-architecture)

</div>

---

##  Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Cloud Infrastructure](#-cloud-infrastructure)
- [Security & Authentication](#-security--authentication)
- [API Layer](#-api-layer)
- [Getting Started](#-tech-stack)
- [Database Design](#-database-design)
- [Development](#-development)
- [Future Enhancements](#-future-enhancements)


---

##  Project Overview

**LiveOps AI Dashboard** is an enterprise-grade, AI-powered real-time operations and data streaming platform built for organizations that demand instant visibility into their live systems. It combines a high-performance reactive frontend with a robust Python backend, an intelligent AI analytics layer, and cloud-native infrastructure to deliver sub-second operational insights at scale.

The platform ingests millions of events per second via **Apache Kafka**, processes them through **Python AI services** for anomaly detection and predictive analytics, persists structured data to **PostgreSQL**, archives raw event data in **AWS S3**, and orchestrates asynchronous workflows through **AWS SQS** — all surfaced through a sleek **ReactJS** dashboard with live-updating charts and intelligent alerting.

**Core use cases:**
- Real-time infrastructure and application monitoring
- AI-driven anomaly detection and predictive alerting
- High-throughput operational data ingestion and archival
- Intelligent decision support for on-call and operations teams
- Live KPI tracking across distributed systems

---

##  Key Features

- **Real-Time Event Streaming** — Ingest and process millions of events per second via Apache Kafka with sub-100ms end-to-end latency
- **AI-Powered Analytics** — Python AI services provide predictive anomaly detection, trend forecasting, and intelligent alerting
- **Interactive Dashboard** — Responsive ReactJS UI with live-updating Recharts visualizations and drill-down capabilities
- **Cloud-Native Infrastructure** — Fully containerized and deployed on AWS with autoscaling, managed queues, and object storage
- **Secure by Default** — JWT authentication, AWS IAM role-based access, encrypted data in transit and at rest
- **Asynchronous Workflows** — AWS SQS decouples heavy processing jobs, ensuring the API stays responsive under load
- **Comprehensive Observability** — AWS CloudWatch dashboards, structured logging, and distributed tracing across all services
- **RESTful + WebSocket API** — FastAPI backend exposes both REST endpoints and WebSocket connections for live data push

---

##  System Architecture

The platform follows a layered, event-driven architecture optimized for throughput, resilience, and horizontal scalability.

```
┌─────────────────────────────────────────────────────────────────┐
│                          USERS / CLIENTS                        │
│              (Browser · Mobile · Third-party API)               │
└─────────────────────────────┬───────────────────────────────────┘
                              │  HTTPS / WSS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ReactJS Frontend (Vite)                     │
│         Tailwind CSS · React Router · Recharts · HMR            │
└─────────────────────────────┬───────────────────────────────────┘
                              │  REST / WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              FastAPI Backend (Python · Uvicorn)                  │
│        Pydantic Validation · SQLAlchemy ORM · JWT Auth          │
│                                                                 │
│   ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐  │
│   │  PostgreSQL   │  │ AI / Python   │  │   AWS Services     │  │
│   │  (Primary DB) │  │   Services    │  │ S3 · SQS · IAM ·  │  │
│   │  SQLAlchemy   │  │  Analytics &  │  │    CloudWatch      │  │
│   │  Migrations   │  │  Predictions  │  │                    │  │
│   └──────────────┘  └───────────────┘  └────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │               Apache Kafka Cluster                       │  │
│   │   Event Producers · Topic Partitions · Consumer Groups   │  │
│   └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              Monitoring, Logging & Observability                 │
│       AWS CloudWatch · Structured Logs · Distributed Tracing    │
└─────────────────────────────────────────────────────────────────┘
```

---

##  Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **ReactJS** | 18.x | UI component framework with concurrent rendering |
| **Vite** | 5.x | Next-generation build tool with instant HMR |
| **Tailwind CSS** | 3.x | Utility-first CSS framework for rapid UI development |
| **React Router** | 6.x | Client-side routing and navigation |
| **Recharts** | 2.x | Composable charting library for metric visualization |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Python** | 3.11+ | Primary backend and AI services language |
| **FastAPI** | 0.110+ | High-performance async REST & WebSocket API framework |
| **Uvicorn** | 0.29+ | Lightning-fast ASGI server for FastAPI |
| **Pydantic** | 2.x | Data validation, serialization, and settings management |
| **SQLAlchemy** | 2.x | ORM and database toolkit with async support |

### Database
| Technology | Purpose |
|---|---|
| **PostgreSQL 16** | Primary relational database for structured operational data |
| **Alembic** | Database schema migrations and version control |

### AI & Analytics
| Technology | Purpose |
|---|---|
| **Python AI Services** | Custom anomaly detection, classification, and forecasting models |
| **Predictive Analytics** | Time-series forecasting for capacity planning and alerting |
| **Real-Time Data Processing** | Stream processing with low-latency inference pipelines |
| **Pandas / NumPy** | Data wrangling and numerical computation |
| **Scikit-learn** | ML model training, evaluation, and serving |

### Cloud (AWS)
| Service | Purpose |
|---|---|
| **AWS S3** | Object storage for raw event archives, AI datasets, and model artifacts |
| **AWS SQS** | Managed message queues for async job orchestration |
| **AWS IAM** | Role-based access control and least-privilege security policies |
| **AWS CloudWatch** | Centralized metrics, logs, alarms, and dashboards |

### Event Streaming
| Technology | Purpose |
|---|---|
| **Apache Kafka** | Distributed, high-throughput, fault-tolerant event streaming |
| **Kafka Connect** | Source and sink connectors for external integrations |
| **Schema Registry** | Centralized schema management for Avro/JSON event payloads |

### DevOps
| Technology | Purpose |
|---|---|
| **Docker / Docker Compose** | Containerization for consistent local and production environments |
| **GitHub Actions** | CI/CD pipelines for automated testing, building, and deployment |
| **AWS ECR** | Private container registry for Docker images |

---



##  Cloud Infrastructure

All cloud resources are provisioned and managed on **Amazon Web Services (AWS)** using infrastructure-as-code principles (Terraform / AWS CDK).

### AWS S3 — Object Storage

**Purpose:** Durable, cost-efficient storage for raw event archives, processed datasets, trained AI model artifacts, and operational reports.

**Design:**
- `liveops-raw-events/` — Partitioned by `year/month/day/hour` for efficient Athena queries
- `liveops-ai-models/` — Versioned model artifacts (`.pkl`, `.pt`) for reproducible deployments
- `liveops-ai-datasets/` — Curated training datasets with versioning and access logging
- `liveops-reports/` — Scheduled batch analysis outputs (CSV, Parquet, PDF)

All buckets enforce server-side encryption (SSE-S3), block all public access, and enable versioning for accidental-deletion recovery.

### AWS SQS — Asynchronous Message Queues

**Purpose:** Decouple long-running or unpredictable background jobs from the synchronous request path to keep API response times consistently fast.

**Queues:**
- `liveops-ai-jobs.fifo` — Ordered queue for AI batch analysis tasks (FIFO ensures exactly-once processing)
- `liveops-notifications` — Alert delivery to email, Slack, and PagerDuty integrations
- `liveops-report-generation` — Scheduled and on-demand report generation jobs
- `liveops-dlq` — Dead-letter queue for failed messages; triggers CloudWatch alarms for operator review

SQS consumers run as background async workers within the FastAPI process, polling with long-polling (20s) to minimize API calls and cost.

### AWS IAM — Identity & Access Management

**Purpose:** Enforce the principle of least privilege across all services, ensuring no component has more access than it needs.

**IAM Roles:**
- `liveops-api-role` — Read/write access to specific S3 prefixes and SQS queues only
- `liveops-ai-role` — Read access to S3 datasets and model buckets; write access to results prefix
- `liveops-ci-role` — Write access to ECR for Docker image pushes; read-only on production resources
- `liveops-monitoring-role` — CloudWatch PutMetricData and Logs write permissions

All roles use instance profiles / OIDC federation (no long-lived access keys). IAM policies are version-controlled and reviewed in pull requests.

### AWS CloudWatch — Monitoring & Observability

**Purpose:** Unified observability plane for metrics, logs, alarms, and operational dashboards across the entire platform.

**Metrics:**
- API request latency, error rates, and throughput (custom namespace: `LiveOps/API`)
- Kafka consumer lag per topic and consumer group
- AI inference latency and model prediction confidence scores
- SQS queue depth, age of oldest message, and DLQ message count

**Alarms:**
- P99 API latency > 500ms → PagerDuty alert
- Kafka consumer lag > 10,000 messages → Slack notification
- SQS DLQ message count > 0 → Immediate engineering alert
- AI anomaly rate spikes → Operational escalation

**Log Groups:** Structured JSON logs from all services are shipped to CloudWatch Logs with 30-day retention. Log Insights queries power ad-hoc debugging and the operational health dashboard.

---

##  Security & Authentication

Security is built into every layer of the platform, following OWASP best practices and AWS Well-Architected Framework security guidelines.

### Authentication Flow

```
Client
  │
  │  POST /auth/login  {email, password}
  ▼
FastAPI Auth Router
  │
  ├── Verify password hash (bcrypt)
  ├── Issue JWT access token (15 min TTL)
  └── Issue JWT refresh token (7 day TTL, stored in HttpOnly cookie)
  │
  ▼
Protected Endpoints
  │
  ├── Validate JWT signature (RS256)
  ├── Check token expiry and revocation list (Redis)
  └── Resolve user permissions and inject into request context
```

##  API Layer

The FastAPI backend exposes a versioned RESTful API (`/api/v1/`) and WebSocket endpoints for live data streaming. Auto-generated interactive documentation is available via Swagger UI and ReDoc.

### Core Endpoints

```
Authentication
  POST   /api/v1/auth/register      Register a new user
  POST   /api/v1/auth/login         Obtain JWT access and refresh tokens
  POST   /api/v1/auth/refresh       Rotate access token using refresh token
  DELETE /api/v1/auth/logout        Revoke refresh token

Metrics & Events
  GET    /api/v1/metrics            Paginated operational metrics (filterable)
  GET    /api/v1/metrics/{id}       Single metric detail with historical trend
  POST   /api/v1/events             Ingest a batch of operational events
  GET    /api/v1/events/stream      WebSocket — live event feed

AI & Analytics
  GET    /api/v1/anomalies          List detected anomalies (severity, time range)
  GET    /api/v1/forecasts          Retrieve AI-generated metric forecasts
  POST   /api/v1/analysis/run       Trigger on-demand AI batch analysis (→ SQS)

Alerts
  GET    /api/v1/alerts             List active and historical alerts
  PATCH  /api/v1/alerts/{id}        Acknowledge or resolve an alert
  POST   /api/v1/alerts/rules       Create a new alert rule

System
  GET    /api/v1/health             Liveness and readiness probe
  GET    /docs                      Swagger UI (development only)
  GET    /redoc                     ReDoc documentation
```


---

## 🗄 Database Design

PostgreSQL is the system of record for structured operational data. The schema is managed through **Alembic** migrations and follows normalized relational design with strategic denormalization for read-heavy query paths.

### Core Tables

```sql
-- Users and authentication
users               (id, email, password_hash, role, created_at, is_active)
refresh_tokens      (id, user_id, token_hash, expires_at, revoked_at)

-- Operational data
events              (id, source, type, timestamp, payload JSONB, kafka_offset, processed_at)
metrics             (id, name, value, unit, tags JSONB, source, recorded_at)
metric_snapshots    (id, metric_name, window_start, window_end, avg, min, max, p99)

-- AI outputs
anomalies           (id, metric_id, score, severity, model_version, detected_at, resolved_at)
forecasts           (id, metric_name, target_time, predicted_value, confidence_interval, created_at)

-- Alerting
alert_rules         (id, name, condition, threshold, severity, created_by, is_active)
alerts              (id, rule_id, triggered_at, resolved_at, acknowledged_by, context JSONB)

-- Audit
audit_log           (id, user_id, action, resource_type, resource_id, timestamp, ip_address)
```

### Performance Optimizations

- **Hypertable partitioning** — `events` and `metrics` are time-partitioned (TimescaleDB extension) with monthly chunks for efficient range queries and automatic data retention policies
- **Partial indexes** — `WHERE resolved_at IS NULL` indexes on `anomalies` and `alerts` for fast active-record lookups
- **JSONB indexing** — GIN indexes on `payload` and `tags` columns for fast ad-hoc filtering by arbitrary dimensions
- **Read replicas** — AI analytics services and the dashboard's read-heavy queries route to a read replica, preserving write throughput on the primary

---

##  Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Docker & Docker Compose
- AWS CLI (configured with appropriate IAM credentials)
- An Apache Kafka cluster (local via Docker or managed AWS MSK)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/liveops-ai-dashboard.git
cd liveops-ai-dashboard
```

### 2. Configure Environment Variables

```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

**Backend `.env`:**
```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/liveops
SECRET_KEY=your-jwt-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=liveops-raw-events
AWS_SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789/liveops-ai-jobs
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
```

### 3. Start with Docker Compose (Recommended)

```bash
# Start PostgreSQL, Kafka, Zookeeper, and all services
docker compose up --build

# Frontend:  http://localhost:5173
# Backend:   http://localhost:8000
# API Docs:  http://localhost:8000/docs
```

### 4. Manual Setup

```bash
# --- Frontend ---
cd frontend
npm install
npm run dev

# --- Backend (separate terminal) ---
cd backend
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

---

##  Development

### Available Scripts

**Frontend (`/frontend`)**

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR at `http://localhost:5173` |
| `npm run build` | Produce an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally for pre-deploy testing |
| `npm run lint` | Run ESLint across all source files |

**Backend (`/backend`)**

| Script | Description |
|---|---|
| `uvicorn app.main:app --reload` | Start FastAPI development server with auto-reload |
| `alembic upgrade head` | Apply all pending database migrations |
| `alembic revision --autogenerate -m "msg"` | Generate a new migration from model changes |
| `pytest` | Run the full test suite |
| `ruff check .` | Lint Python source files |

### Project Structure

```
liveops-ai-dashboard/
│
├── frontend/                         # ReactJS application (Vite)
│   ├── src/
│   │   ├── main.jsx                  # App entry point and router mounting
│   │   ├── App.jsx                   # Layout and top-level routes
│   │   ├── pages/                    # Page components
│   │   │   ├── Dashboard.jsx         # Main live metrics dashboard
│   │   │   ├── Anomalies.jsx         # AI anomaly feed and detail view
│   │   │   ├── Forecasts.jsx         # Predictive analytics charts
│   │   │   ├── Alerts.jsx            # Alert management interface
│   │   │   ├── LandingPage.jsx       # Public marketing page
│   │   │   ├── Login.jsx             # Authentication
│   │   │   └── Signup.jsx            # User registration
│   │   ├── components/               # Reusable UI components
│   │   │   ├── MetricCard.jsx        # KPI stat card with trend indicator
│   │   │   ├── LiveChart.jsx         # Recharts wrapper with WebSocket data
│   │   │   ├── AlertBanner.jsx       # Inline alert notification
│   │   │   ├── Button.jsx            # Styled button primitive
│   │   │   └── Footer.jsx            # Site footer
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── useWebSocket.js       # WebSocket connection and reconnect logic
│   │   │   └── useMetrics.js         # SWR-based metric data fetching
│   │   ├── styles/                   # Design tokens and global CSS
│   │   └── assets/                   # Images and static files
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                          # FastAPI Python application
│   ├── app/
│   │   ├── main.py                   # App factory and startup
│   │   ├── api/v1/routes/            # API route handlers
│   │   ├── core/                     # Config, security, Kafka client
│   │   ├── models/                   # SQLAlchemy ORM models
│   │   ├── schemas/                  # Pydantic request/response schemas
│   │   ├── services/                 # Business logic and AWS integrations
│   │   └── repositories/             # Database access layer
│   ├── alembic/                      # Database migration scripts
│   ├── tests/                        # Pytest test suite
│   └── requirements.txt
│
├── ai-services/                      # Python AI microservices
│   ├── anomaly_detector/             # Isolation Forest anomaly detection
│   ├── forecaster/                   # Time-series prediction service
│   ├── decision_support/             # Rule + ML recommendation engine
│   └── data_pipeline/                # Feature engineering and ETL
│
├── infrastructure/                   # IaC and deployment config
│   ├── terraform/                    # AWS resource definitions
│   └── docker/                       # Dockerfiles per service
│
├── .github/workflows/                # GitHub Actions CI/CD pipelines
│   ├── ci.yml                        # Test, lint, and build on PR
│   └── deploy.yml                    # Deploy to AWS on main merge
│
└── docker-compose.yml                # Local development orchestration
```

---



### CI/CD Pipeline (GitHub Actions)

```yaml
On Pull Request:
  - Lint (ESLint + Ruff)
  - Unit & integration tests (Pytest + Vitest)
  - Docker image build validation

On Merge to Main:
  - Build and push Docker images to AWS ECR
  - Run database migrations (Alembic)
  - Deploy new ECS task definitions (blue/green)
  - Run smoke tests against production
  - Notify Slack on success/failure
```

---

##  Future Enhancements

| Enhancement | Description | Priority |
|---|---|---|
| **Multi-tenancy** | Organization-level data isolation with tenant-scoped Kafka topics and PostgreSQL row-level security | High |
| **LLM Integration** | Natural language querying of operational data — "What caused the latency spike last Tuesday?" | High |
| **Graph ML** | Graph neural networks for root-cause analysis across correlated services and dependencies | Medium |
| **OpenTelemetry** | Distributed tracing across all services with Jaeger/Tempo for deep request inspection | Medium |
| **Mobile App** | React Native companion app with push notifications for critical alerts | Medium |
| **Automated Remediation** | AI-triggered runbooks that automatically scale infrastructure or restart services | High |
| **Data Marketplace** | Share anonymized operational datasets between organizations for cross-industry benchmarking | Low |
| **Compliance Reporting** | SOC 2 and GDPR-ready audit log exports and compliance dashboard | Medium |

---



---




##  Troubleshooting

**Dependency issues (frontend):** Delete `node_modules` and `package-lock.json`, then run `npm install`.

**Database migration failures:** Ensure PostgreSQL is running and `DATABASE_URL` is correctly set, then run `alembic upgrade head --verbose` for detailed output.

**Kafka connection errors:** Verify `KAFKA_BOOTSTRAP_SERVERS` is reachable from the backend container. Use `docker compose logs kafka` to inspect broker startup.


---