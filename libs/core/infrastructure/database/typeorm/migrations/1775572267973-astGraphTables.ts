import { MigrationInterface, QueryRunner } from 'typeorm';

export class AstGraphTables1775572267973 implements MigrationInterface {
    name = 'AstGraphTables1775572267973';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."ast_graph_status_enum" AS ENUM('pending', 'building', 'ready', 'failed')
        `);

        await queryRunner.query(`
            CREATE TABLE "repositories" (
                "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "integration_config_id" UUID NOT NULL,
                "external_id" TEXT NOT NULL,
                "name" TEXT NOT NULL,
                "full_name" TEXT NOT NULL,
                "platform" TEXT NOT NULL,
                "default_branch" TEXT NOT NULL DEFAULT 'main',
                "ast_graph_status" "public"."ast_graph_status_enum" DEFAULT 'pending',
                "ast_graph_sha" TEXT,
                "ast_graph_built_at" TIMESTAMP,
                "ast_graph_node_count" INTEGER DEFAULT 0,
                "ast_graph_edge_count" INTEGER DEFAULT 0,
                CONSTRAINT "PK_repositories" PRIMARY KEY ("uuid"),
                CONSTRAINT "UQ_repositories_platform_external" UNIQUE ("platform", "external_id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "ast_nodes" (
                "id" BIGSERIAL NOT NULL,
                "repo_id" UUID NOT NULL,
                "kind" TEXT NOT NULL,
                "name" TEXT NOT NULL,
                "qualified_name" TEXT NOT NULL,
                "file_path" TEXT NOT NULL,
                "line_start" INTEGER,
                "line_end" INTEGER,
                "language" TEXT,
                "parent_name" TEXT,
                "params" TEXT,
                "return_type" TEXT,
                "modifiers" TEXT,
                "is_test" BOOLEAN DEFAULT FALSE,
                "file_hash" TEXT,
                CONSTRAINT "PK_ast_nodes" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_ast_nodes_repo_qualified" UNIQUE ("repo_id", "qualified_name"),
                CONSTRAINT "FK_ast_nodes_repo" FOREIGN KEY ("repo_id")
                    REFERENCES "repositories"("uuid") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "ast_edges" (
                "id" BIGSERIAL NOT NULL,
                "repo_id" UUID NOT NULL,
                "kind" TEXT NOT NULL,
                "source_qualified" TEXT NOT NULL,
                "target_qualified" TEXT NOT NULL,
                "file_path" TEXT NOT NULL,
                "line" INTEGER DEFAULT 0,
                "confidence" REAL,
                CONSTRAINT "PK_ast_edges" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_ast_edges_repo_kind_src_tgt" UNIQUE ("repo_id", "kind", "source_qualified", "target_qualified"),
                CONSTRAINT "FK_ast_edges_repo" FOREIGN KEY ("repo_id")
                    REFERENCES "repositories"("uuid") ON DELETE CASCADE
            )
        `);

        await queryRunner.query(`CREATE INDEX "idx_ast_nodes_repo_file" ON "ast_nodes"("repo_id", "file_path")`);
        await queryRunner.query(`CREATE INDEX "idx_ast_nodes_repo_kind" ON "ast_nodes"("repo_id", "kind")`);
        await queryRunner.query(`CREATE INDEX "idx_ast_nodes_repo_qual" ON "ast_nodes"("repo_id", "qualified_name")`);
        await queryRunner.query(`CREATE INDEX "idx_ast_edges_repo_source" ON "ast_edges"("repo_id", "source_qualified")`);
        await queryRunner.query(`CREATE INDEX "idx_ast_edges_repo_target" ON "ast_edges"("repo_id", "target_qualified")`);
        await queryRunner.query(`CREATE INDEX "idx_ast_edges_repo_kind" ON "ast_edges"("repo_id", "kind")`);
        await queryRunner.query(`CREATE INDEX "idx_ast_edges_repo_file" ON "ast_edges"("repo_id", "file_path")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "ast_edges"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "ast_nodes"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "repositories"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."ast_graph_status_enum"`);
    }
}
