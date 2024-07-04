import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';
// AAA 패턴
// 1. Arrange: 테스트를 위한 환경 만들기
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

// beforeEach(async () => {
//     await render(<TextField className={'my-class'} />);
// });

it('props 로 넘긴 css class 가 적용 된다.', async () => {
    // 1. Arrange
    await render(<TextField className={'my-class'} />);

    // 2. Act
    // 생략

    // 3. Assert
    // vitest의 expect 함수를 사용하여 기대 결과를 검증.
    // 렌더링 되는 DOM 구조가 올바르게 변경되었는지 확인 (O) -> 사용자가 보는 DOM
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // screen.debug();
    expect(textInput).toHaveClass('my-class');
});

// describe () : it 함수들을 그룹화 하기 위한 함수
describe('placeholder', () => {
    // it -> test 함수의 alias (별칭)
    it('기본 placeholder "텍스트를 입력해 주세요."가 출력된다.', async () => {
        // 기대 결과를 it 함수의 두 번째 인자로 전달.
        // 기대 결과 === 실제 결과 ? 성공 : 실패
        await render(<TextField />);

        const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
        // 단언*assertion -> 테스트가 통과하기 위한 조건 -> 검증 실행.
        expect(textInput).toBeInTheDocument();
    });

    it('placeholder props 에 따라 placeholder가 변경된다.', async () => {
        // 기대 결과를 it 함수의 두 번째 인자로 전달.
        // 기대 결과 === 실제 결과 ? 성공 : 실패
        await render(<TextField placeholder={'상품명을 입력해 주세요.'} />);

        const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');
        expect(textInput).toBeInTheDocument();
    });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수를 호출한다.', async () => {
    const spy = vi.fn(); // 스파이 함수
    // 스파이 함수 - 테스트 코드에서 특정 함수가 호출 되었는지 함수의 인자로 어떤 것이 넘어왔는지,
    // 어떤 값을 반환하는 지 등 다양한 값들을 저장.
    const { user } = await render(<TextField onChange={spy} />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, '테스트 상품명');

    expect(spy).toHaveBeenCalledWith('테스트 상품명');
});

it('Enter키를 입력하면 onEnter prop으로 등록한 함수를 호출한다.', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onEnter={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, '테스트 입력{Enter}');

    expect(spy).toHaveBeenCalled('테스트 입력');
});

it('focus 시 onFocus prop으로 등록한 함수를 호출한다.', async () => {
    /**
     * focus 활성화
     * 1. 탭 키로 인풋 요소로 포커스 이동
     * 2. 인풋 요소를 직접 클릭
     * 3. textInput.focus() 로 직접 발생
     */
    const spy = vi.fn();
    const { user } = await render(<TextField onFocus={spy} />);
    const target = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(target);

    expect(spy).toHaveBeenCalled();
});

it('focus 시 border 스타일 변경', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onFocus={spy} />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);

    expect(textInput).toHaveStyle({ 'border-width': '2px', 'border-color': 'rgb(25, 118, 210)' });
});
