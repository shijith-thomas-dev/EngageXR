-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public."Companies"
(
    "Name" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(30) COLLATE pg_catalog."default",
    "Phone" character varying(13) COLLATE pg_catalog."default",
    "Website" character varying(30) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Companies_pkey" PRIMARY KEY ("Name")
);

CREATE TABLE IF NOT EXISTS public."Employees"
(
    "EmployeeID" integer NOT NULL DEFAULT nextval('"Employees_EmployeeID_seq"'::regclass),
    "Firstname" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "Lastname" character varying(30) COLLATE pg_catalog."default",
    "Email" character varying(30) COLLATE pg_catalog."default",
    "Phone" character varying(13) COLLATE pg_catalog."default",
    "CompanyName" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Employees_pkey" PRIMARY KEY ("EmployeeID")
);

CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    "Email" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "Password" character varying(100) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Employees"
    ADD CONSTRAINT "Employees_CompanyName_fkey" FOREIGN KEY ("CompanyName")
    REFERENCES public."Companies" ("Name") MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;

END;