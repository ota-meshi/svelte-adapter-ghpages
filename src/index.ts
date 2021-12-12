import staticAdapter from "@sveltejs/adapter-static"
import type { Adapter } from "@sveltejs/kit"

/**
 * Creates svelte-adapter-ghpages
 */
export default function (
    options: Parameters<typeof staticAdapter>[0],
): Adapter {
    const baseStaticAdapter = staticAdapter(options)
    const pages = options?.pages || "build"
    return {
        name: "svelte-adapter-ghpages",
        async adapt(arg) {
            await baseStaticAdapter.adapt(arg)
            arg.utils.copy(`${pages}/404/index.html`, `${pages}/404.html`)
            arg.utils.rimraf(`${pages}/404`)
        },
    }
}
