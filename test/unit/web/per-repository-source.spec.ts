import fs from "node:fs";
import path from "node:path";

describe("per repository source", () => {
    it("does not gate repository sidebar items behind mounted state", () => {
        const source = fs.readFileSync(
            path.join(
                process.cwd(),
                "apps/web/src/app/(app)/settings/_components/per-repository/repository.tsx",
            ),
            "utf8",
        );

        expect(source).not.toContain("const [mounted, setMounted]");
        expect(source).not.toContain("mounted &&");
    });
});
