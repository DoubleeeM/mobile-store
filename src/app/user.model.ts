export class User {
  constructor(
    public email: string,
    public id: string,
    private userToken: string,
    private userTokenExpirationDate: Date) {}

    get token(): any {
      if (!this.userTokenExpirationDate || new Date() > this.userTokenExpirationDate) {
        return null;
      }

      return this.userToken;

    }
}
