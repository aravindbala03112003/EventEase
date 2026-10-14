export const ErrorPresenter = {
  toHttp(error: unknown) {
    if (error instanceof Error) {
      const status = (error as any).status ?? 500;
      return {
        status,
        body: { message: error.message }
      };
    }
    return {
      status: 500,
      body: { message: "Internal server error" }
    };
  }
};
