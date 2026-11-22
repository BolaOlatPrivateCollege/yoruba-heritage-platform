# Repository setup — one-time owner action

GitHub's connected integration currently supports working inside existing repositories, but **not creating a new repository**. The owner must create it once. No other existing repository should be repurposed or modified.

1. Sign into the GitHub account **BolaOlatPrivateCollege**.
2. Go to `https://github.com/new`.
3. Repository owner: `BolaOlatPrivateCollege`; name: `yoruba-heritage-platform`.
4. Choose **Private**. Do **not** initialize it with README, license, or .gitignore (this foundation already contains them).
5. Create repository and share the repository URL in the project conversation.
6. The engineering assistant can then use the connected GitHub integration to commit the prepared files and open a PR from the first scoped feature branch. This does not mean Codex runs automatically: the owner must explicitly open a Codex task against the repository.

The folder in the downloadable ZIP is a **local handoff**, not evidence that the GitHub repository exists. Do not publish secrets or private oral-history contributions in the code repository. Create the repo before attempting a push; the existing `git` commit can be pushed with proper authorised GitHub credentials if desired.
