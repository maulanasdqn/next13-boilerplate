{ pkgs, ... }:

{
  env.GREET = "devenv";

  packages = with pkgs; [ git bun nodejs ];

  dotenv.enable = true;

  enterShell = ''
    git --version
    node --version
    bun --version
  '';

  services.postgres = {
    enable = true;
    package = pkgs.postgresql_15;
    initialDatabases = [{ name = "umkm_db"; }];
  };

  languages.typescript.enable = true;
  pre-commit.hooks.shellcheck.enable = true;
}
