import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('props 로 넘긴 css class 가 적용 된다.', async () => {
  // AAA 패턴
  // 1. Arrange: 테스트 를 위한 환경 만들기
  // -> className 을 지닌 컴포넌트 렌더링
  // 2. Act: 테스트 할 동작 발생
  // -> 렌더링 에 대한 검증 이기 때문에 이 단계 생략.
  // -> 클릭 이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당.
  // 3. Assert: 올바른 동작이 실행 되는지 검증.
  // -> 렌더링 후 DOM 에 해당 class 가 존재 하는지 검증.

  /**
   * React Testing Library 의 render() 함수 호출 ->
   * * 테스트 환경의 jsDOM 에 리액트 컴포넌트가 렌더링 된 DOM 구조가 반영
   * --
   * jsDOM: Node.js 에서 사용 하기 위해 많은 웹 표준을 순수 자바스크립트로 구현.
   */
  // 1. Arrange
  await render(<TextField className={"my-class"} />);

  // 2. Act
  // 생략

  // 3. Assert
  // vitest의 expect 함수를 사용하여 기대 결과를 검증.
  // 렌더링 되는 DOM 구조가 올바르게 변경되었는지 확인 (O) -> 사용자가 보는 DOM
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  )
});
