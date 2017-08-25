# Contributing
## Foreword
Thank you for deciding to contribute to `EventsPool`!

I must say this is a very small and simple library meant mainly for educational purposes. However, that does not mean that it is perfect and cannot be improved in different ways. In general, please try to keep the library simple and clean, devoted to a single goal - accumulating the events.

Thank you once more.

## Running `EventsPool`
After cloning the repository, just run the following command in the terminal and develop under `src/` folder:
```
npm start
```

## Git workflow
Regardless of the goal of your contribution, Git workflow is the same sequence of steps to perform. Please be acknowledges with the following workflow to experience a seamless contribution cycle to this repository.
1. Create a dedicated issue/feature branch from the current `master` branch. Make sure to name your branch with a corresponding prefix (i.e. `issue/fix-this` or `feature/amazing-change`):
```
git checkout -b feature/amazing-feature
```
2. Develop.
3. Once your job is done, push your changes into the remote branch with the same name as your branch.
```
git commit -am 'Added enhanced logging'
git push -u origin feature/amazing-feature
```
4. Rebase your feature branch relatively to the `master` branch:
```
git checkout master
git pull --rebase
git checkout feature/amazing-feature
git rebase master
```
5. Resolve possible rebase conflicts and submit a new [Pull request](https://github.com/kettanaito/events-pool/compare).
6. Provide necessary amendments from the code review and remember to keep your branch up to date with the `master`.
7. Once code review is passed, your feature branch will be merged into the `master` by repository administrators.

## Reporting a bug
Found a devastating unexpected behavior? Lets eliminate it together.
1. Review the [Issues](https://github.com/kettanaito/events-pool/issues) section to make sure there are no similar bugs already submitted.
2. Create a [New Issue](https://github.com/kettanaito/events-pool/issues/new) in case there are no duplicates.
3. Fill in the template with a proper information regarding the bug you have discovered.

If you know a solution and would like to fix that annoying bug, please read the [Git workflow](#git-workflow) section. After the bug is confirmed by the repository's administrators, you may start the fixing process.

## Feature request
There is an obvious functionality missing in the library? Or, maybe, there is *just one thing* which could make your development experience far more superior? Had any of the latter thoughts crossed your mind, feel free to submit a new Feature request.

### Guidelines
Please follow the next guidelines when submitting a new feature:
1. Review [Issues](https://github.com/kettanaito/events-pool/issues) section of the library to ensure there is no similar feature request already.
2. Yes! You are lucky to be the first one to think of this great feature! [Submit a new Issue](https://github.com/kettanaito/events-pool/issues/new) with a `Feature` label.
3. In the feature description provide a detailed explanation what is a new feature going to be about, what benefits it may bring and how do you plan to implement it.
4. Once your feature request is approved, you can start the development. Follow the [Git workflow](#git-workflow) to ensure repository is maintained properly.

## Other ways of contribution
Feel free to write to the repository's administrators on the matter of other ways of contribution. We will try to answer you as soon as we can to discuss our cooperation.
