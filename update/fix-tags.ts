/**
 * fixes tags
 * (I had it set to create tags with `v` prefixed,
 * but I didn't fix the `@require` tag being formatted as if there was none)
 */
import { simpleGit } from "simple-git";

const git = simpleGit();
const splitted = import.meta.dirname?.split("/");
splitted?.pop();

const a = await git.tags();

for (const tag of a.all) {
	// needs fixing
	if (tag.startsWith("v")) {
		const newTag = tag.slice(1);
		git.tag([newTag, tag]).tag(["-d", tag]).push(undefined, undefined, [
			newTag,
			`:${tag}`,
		]);
	}
}
