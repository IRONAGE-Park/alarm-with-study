/**
 * `Main-process`
 *
 * 'App Regist Module'
 *
 * `App`이 실행되면서
 * 동시에 등록되어야 하는 기능들의 클래스
 *
 * `ModuleRegist`에 `Register` instance의 배열을 통해
 * 모든 레지스터 클래스 기능 등록
 */
abstract class Register {
  /** 레지스터의 이름 */
  private name?: string;

  /**
   * `Register` 클래스 생성자
   *
   * @param name 레지스터의 이름
   */
  constructor(name?: string) {
    this.name = name;
  }

  /**
   * 레지스터 등록 Listener
   *
   * 레지스터 기능을 Regist하는 메소드로,
   * 해당 메소드를 등록해야만 Register 생성 후 App에서 사용 가능함
   */
  public abstract registerListener(): void;
}

/**
 * `App` 실행 시 모든 레지스터 클래스 기능을 등록하기 위한 함수
 *
 * @param registers 레지스터 instance의 배열
 */
export const usingRegister = (registers: Register[]): void => {
  registers.forEach(register => {
    register.registerListener();
  });
};

export default Register;
