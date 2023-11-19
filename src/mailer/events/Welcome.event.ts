export class WelcomeEvent{
    constructor(
        public readonly message: String,
        public readonly to: string,
    ){}
}