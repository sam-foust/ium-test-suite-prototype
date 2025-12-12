# IUM Components - Organized by Feature Groups

## Overview
This document organizes IUM components into logical feature groups for testing. Each group represents a cohesive set of features that should be tested together by a single person to ensure comprehensive coverage with minimal overlap.

---

## Password Management & Recovery
**Purpose:** All password-related flows from user self-service to admin actions to account recovery

| Component | Feature | Sub-Features | Notes |
| :---- | :---- | :---- | :---- |
| **Admin - Account** | Account Creation - Preset Password | Create user with username and password provided at creation | Credentials set during creation |
| **User Self-Admin** | Change password | User-initiated password change | Handle force logout on change password |
| **Admin - Account Actions** | Set temporary password | Admin sets temp password for user | Handle force logout |
| **Admin - Account Actions** | Send password reset | Admin triggers password reset email | |
| **Authentication - Account Validation** | Password change on expiry | Forced password change flow | |
| **Authentication - Recovery** | Forgot password | User-initiated password recovery | |
| **Authentication - Recovery** | Temporary password | Login with temporary password | |
| **Authentication - Fallback** | Fallback Login | Test fallback login functionality | When okta authentication methods fail or unavailable |

---

## Multi-Factor Authentication (MFA)
**Purpose:** All MFA flows including user experience during login and administrative management

| Component | Feature | Sub-Features | Notes |
| :---- | :---- | :---- | :---- |
| **Authentication - 1st Factor** | Password | Password-based first factor auth | |
| **Authentication - 2nd Factor** | SMS | SMS verify number, challenge | Dynamic trust: Challenge second factor only if external IDP did not challenge |
| **Authentication - 2nd Factor** | TOTP | TOTP provision, challenge | |
| **Authentication - 2nd Factor** | Recovery codes | Recovery provision, challenge | |
| **Authentication - 2nd Factor** | Additional factor | Add factors (SMS → SMS+TOTP) | |
| **Authentication - 2nd Factor** | Switch factor | Switch between configured factors | |
| **Admin - MFA** | Enable/disable MFA | Admin enables/disables MFA for tenant | |
| **Admin - MFA** | Reset MFA | Reset MFA (TOTP, Recovery) for users | Handle recovery code regeneration |
| **Admin - MFA** | MFA error logs | View and troubleshoot MFA errors | |

---

## Single Sign-On (SSO)
**Purpose:** All SSO-related functionality from tenant configuration to user authentication

| Component | Feature | Sub-Features | Notes |
| :---- | :---- | :---- | :---- |
| **Admin - SSO** | Tenant Provisioning | Configure SSO for tenant | |
| **Admin - SSO** | User SSO Maintenance | Manage SSO settings per user | |
| **Authentication - 1st Factor** | SSO | SSO-based first factor auth | SSO is a feature of first factor authentication |

---

## User Account Management
**Purpose:** Account creation, invitations, and lifecycle management for users (individual and bulk operations)

| Component | Feature | Sub-Features | Notes |
| :---- | :---- | :---- | :---- |
| **Admin - Account** | Account Creation - Send Invite | Create user by sending email invitation | For Employees and Technicians. *Where do identities fit in?* |
| **Admin - Account** | Account Creation - Create Account Later | Create user account without immediate credentials | User receives credentials later |
| **Admin - Account Actions** | Bulk Send Invite | Send invitations to multiple users at once | Bulk invitation operations |
| **Admin - Account Actions** | Deactivate employee | Deactivate user account | Handle force logout and recovery code |
| **Admin - Account Actions** | Lock/unlock | Lock or unlock user account | Handle force logout and recovery code on lock/deactivate |
| **Admin - Account Actions** | Bulk actions | Bulk: password reset, temp password, deactivate, lock/unlock | Individual and bulk actions, handle force logout appropriately |
| **Admin - Account Actions** | Impersonation | Impersonate as owner into a tenant | Check impersonation restrictions and access controls |
| **Authentication - Account Validation** | Email validation | Validate user email address | |
| **Authentication - Account Validation** | Session restrictions | Limit concurrent sessions | |

---

## Permissions & Roles Management
**Purpose:** Role creation/editing, permission assignment, and audit tracking for employees and technicians

| Component | Feature | Sub-Features | Notes |
| :---- | :---- | :---- | :---- |
| **Admin - Role Permissions** | Employee/Technician Role Maintenance | Create and manage roles | |
| **Admin - Role Permissions** | Edit Role | Modify role permissions | Exclude Reporting/Dashboard permissions |
| **Admin - Account** | Edit permissions | Edit individual user permissions | |
| **Authorization** | Role enforcement | Permission checking and enforcement | *Move roles here? Enforcement* |
| **Admin - Audit Trail** | Audit logging | Track all administrative actions | Primarily tracks role and permission changes |

---

## Profile Management
**Purpose:** User profile information maintenance (admin and self-service) and identity directory synchronization

| Component | Feature | Sub-Features | Notes |
| :---- | :---- | :---- | :---- |
| **Admin - Profiles** | Edit Employee Profile | Manage employee profile data | |
| **Admin - Profiles** | Edit Technician Profile | Manage technician profile data | |
| **User Self-Admin** | Change phone number | User updates their phone | |
| **Admin - Tenant Management** | Sync User Button | Sync users from tenant management system | Fixes out of sync accounts |
| **Admin - Identity Directory** | Identity Directory Updates | Update identity directory entries | Maintain consistency across systems |

---

## API/Client & Performance
**Purpose:** API testing, client integrations, token management, and performance validation

| Component | Feature | Sub-Features | Notes |
| :---- | :---- | :---- | :---- |
| **TokenServer** | Token Management | Test tokenserver clients and tokens work | Validate token generation, refresh, expiration |
| **TokenServer** | Performance Testing | Manual performance testing on tokenserver | Load testing, response times, throughput |
| **Identity Directory** | Performance Testing | Manual performance testing on identity directory | Query performance, sync performance |
| **APIs & Services** | API Testing | Various other APIs and services | *What other APIs/services need testing?* |

