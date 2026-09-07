# Vector role-based access control

Bootstrap policy lives in `src/config/rbac.ts`; reviewed tenant overrides live in PostgreSQL. The Access page edits complete role grants, while every server route independently applies the same effective-policy evaluator.

| Role | Intended access |
|---|---|
| `owner` | Immutable full access and security ownership |
| `admin` | Full workspace, integration, and access administration |
| `lead` | Issues, cycles, projects, workflows, analytics, assistant |
| `engineer` | Dashboard, issue management, assistant |
| `product` | Issues, projects, analytics, assistant |
| `analyst` | Dashboard, analytics, assistant |
| `viewer` | Read-only dashboard |

Default group mappings are `vector-owners`, `vector-admins`, `engineering-leads`, `engineers`, `product-partners`, and `delivery-analytics`. Unknown groups receive `viewer`.

To add a permission, define it in `rbacConfig.permissions`, grant it narrowly, enforce it on every corresponding API, conditionally expose the UI, and add positive and negative tests. The owner row cannot be edited to prevent accidental lockout. Policy replacement and its audit event share one transaction.
