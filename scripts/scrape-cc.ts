import CompCap from '../src/models/CompCap.js';
import CudaV from '../src/models/CudaV.js';
import CompCapDep from '../src/models/CompCapDep.js';
import { JSDOM } from 'jsdom';

async function ScrapeCC(): Promise<CompCapDep[]> {
    const ccDeps: CompCapDep[] = [];

    const url = "https://docs.nvidia.com/datacenter/tesla/drivers/index.html";
    const dom = await JSDOM.fromURL(url);
    const doc = dom.window.document;
    const table = doc.getElementById("cuda-and-architecture-matrix-table");
    if (!table) {
        console.error("Table not found");
        return ccDeps;
    }

    const cap = table.querySelector("caption");
    if (!(cap && cap.textContent && cap.textContent.includes("CUDA and Architecture Matrix"))) {
        console.error("Table caption not found or does not match");
        return ccDeps;
    }
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
        const ccDepsRow = parseRow(row);
        ccDepsRow.forEach((ccDep) => {
            ccDeps.push(ccDep);
        });
    })
    return ccDeps;
}

function parseRow(row: Element): CompCapDep[] {
    const cells = row.querySelectorAll("td");
    const ccs = Array.from(cells[1].querySelectorAll("p"), p => p.textContent?.trim() ?? "");
    const minCudas = Array.from(cells[2].querySelectorAll("p"), p => p.textContent?.trim() ?? "");
    const maxCudas = Array.from(cells[3].querySelectorAll("p"), p => p.textContent?.trim() ?? "");

    const maxLen = Math.max(ccs.length, minCudas.length, maxCudas.length);
    const ccDeps: CompCapDep[] = [];
    for (let i = 0; i < maxLen; i++) {
        const cc = ccs[Math.min(i, ccs.length - 1)];
        let minCuda = minCudas[Math.min(i, minCudas.length - 1)];
        minCuda = minCuda.replace("CUDA", "").trim();
        if (minCuda.split(" ").length > 1) {
            minCuda = minCuda.split(" ")[0].trim();
        }
        let maxCuda = maxCudas[Math.min(i, maxCudas.length - 1)];
        maxCuda = maxCuda.replace("CUDA", "").replace("x", "999").replace("Ongoing", "999.999").trim();
        ccDeps.push(new CompCapDep(new CompCap(cc), new CudaV(minCuda), new CudaV(maxCuda)));
    }
    return ccDeps;
}
export default ScrapeCC;
