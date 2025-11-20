-- Core domain tables for AutoPass
-- Ensure auth schema exists (используется для auth-компонентов при необходимости)
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS app;

-- Note: These scripts are applied only on fresh DB initialization by Postgres entrypoint.
-- If your DB volume already exists, either apply manually or recreate the volume.

-- Ensure minimal auth tables exist for FK references (Hibernate will extend columns)
CREATE TABLE IF NOT EXISTS auth.users (
  id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS auth.pass_requests (
  id BIGSERIAL PRIMARY KEY
);

-- Departments
CREATE TABLE IF NOT EXISTS app.departments (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

-- Employees
CREATE TABLE IF NOT EXISTS app.employees (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(50),
  position VARCHAR(120),
  department_id BIGINT REFERENCES app.departments(id) ON DELETE SET NULL,
  employee_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',            -- ACTIVE/ON_LEAVE/FIRED/BLOCKED/EXPIRED
  pass_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',                -- ACTIVE/BLOCKED/EXPIRED
  pass_code VARCHAR(64),
  pass_expires_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_employees_department ON app.employees(department_id);
CREATE INDEX IF NOT EXISTS idx_employees_status ON app.employees(employee_status);
CREATE INDEX IF NOT EXISTS idx_employees_pass_status ON app.employees(pass_status);

-- Checkpoints (entry points)
CREATE TABLE IF NOT EXISTS app.checkpoints (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  location VARCHAR(200)
);

-- Access logs (for reports)
CREATE TABLE IF NOT EXISTS app.access_logs (
  id BIGSERIAL PRIMARY KEY,
  occurred_at TIMESTAMPTZ NOT NULL,
  employee_id BIGINT REFERENCES app.employees(id) ON DELETE SET NULL,
  employee_name_snapshot VARCHAR(150),
  checkpoint_id BIGINT REFERENCES app.checkpoints(id) ON DELETE SET NULL,
  checkpoint_name_snapshot VARCHAR(120),
  event_type VARCHAR(10) NOT NULL,                                   -- ENTRY/EXIT
  access_status VARCHAR(10) NOT NULL,                                -- GRANTED/DENIED
  denial_reason VARCHAR(50),                                         -- EMPLOYEE_FIRED/PASS_NOT_FOUND/etc
  pass_code_snapshot VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_access_logs_time ON app.access_logs(occurred_at);
CREATE INDEX IF NOT EXISTS idx_access_logs_employee ON app.access_logs(employee_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_checkpoint ON app.access_logs(checkpoint_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_status ON app.access_logs(access_status);

-- Pass actions (audit for requests approvals/rejections)
CREATE TABLE IF NOT EXISTS app.pass_actions (
  id BIGSERIAL PRIMARY KEY,
  pass_request_id BIGINT NOT NULL,
  action VARCHAR(10) NOT NULL,                                       -- APPROVE/REJECT
  actor_user_id BIGINT,                                              -- references users(id)
  reason TEXT,                                                       -- optional for REJECT
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_pass_actions_request FOREIGN KEY(pass_request_id) REFERENCES auth.pass_requests(id) ON DELETE CASCADE,
  CONSTRAINT fk_pass_actions_actor FOREIGN KEY(actor_user_id) REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_pass_actions_request ON app.pass_actions(pass_request_id, created_at);

-- Integrations configuration (optional, used by Settings → Integrations)
CREATE TABLE IF NOT EXISTS app.integrations (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  type VARCHAR(20) NOT NULL,                                         -- CHECKPOINT/LPR/EMAIL/SMS/WEBHOOK
  endpoint TEXT,
  username VARCHAR(120),
  secret TEXT,
  status VARCHAR(20) DEFAULT 'DISCONNECTED',
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_integrations_type ON app.integrations(type);

-- Backups metadata (optional, used by Settings → Backup)
CREATE TABLE IF NOT EXISTS app.backups (
  id BIGSERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  size_bytes BIGINT,
  type VARCHAR(10) NOT NULL,                                         -- AUTO/MANUAL
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


