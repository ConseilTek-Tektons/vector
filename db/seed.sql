insert into organisation (id, name, slug) values ('00000000-0000-4000-8000-000000000001', 'ConseilTek Engineering', 'conseiltek-engineering');
insert into app_user (id, organisation_id, identity_subject, email, display_name) values
  ('10000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'demo-engineer', 'engineer@example.test', 'Demo Engineer'),
  ('10000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001', 'demo-lead', 'lead@example.test', 'Demo Lead');
insert into team (id, organisation_id, name, key, next_issue_number) values ('20000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'Platform Engineering', 'PLAT', 1045);
insert into workflow_state (id, team_id, name, category, position) values
  ('30000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'Backlog', 'backlog', 10),
  ('30000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', 'In progress', 'started', 20),
  ('30000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000001', 'Done', 'completed', 30);
insert into project (id, organisation_id, team_id, name, slug, summary, lead_id, status, target_date) values ('40000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'Checkout resilience', 'checkout-resilience', 'Harden checkout and payment processing.', '10000000-0000-4000-8000-000000000002', 'active', current_date + 45);
insert into cycle (id, team_id, name, starts_on, ends_on, goal, status) values ('50000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'Cycle 18', current_date - 4, current_date + 10, 'Reduce operational risk in the checkout path.', 'active');
insert into issue (organisation_id, team_id, number, project_id, cycle_id, state_id, assignee_id, creator_id, title, description, priority, estimate) values
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 1042, '40000000-0000-4000-8000-000000000001', '50000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000002', 'Add payment retry telemetry', 'Expose retry outcomes to the service dashboard.', 'high', 3),
  ('00000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 1043, '40000000-0000-4000-8000-000000000001', '50000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', null, '10000000-0000-4000-8000-000000000002', 'Document failover procedure', 'Create an operator-reviewed recovery runbook.', 'medium', 2);
