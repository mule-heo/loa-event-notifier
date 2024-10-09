# Lost Ark Event Notifier

## Summary

새롭게 추가된 이벤트와 종료가 임박한 이벤트에 대한 정보를 카카오톡 메시지로 전송합니다.

Notifies newly added events and ending soon events by kakaotalk message.

> 테스트 앱(비즈니스 앱 권한을 얻지 않은 앱)은 애플리케이션 개발 팀에 속한 멤버에게만 카카오톡 메시지를 전송할 수 있습니다. Test app can only send kakaotalk message to people who are belong to same team of your application.

## Preview

<div>
  <img src="https://github.com/user-attachments/assets/37433004-56b7-4254-a641-3557e90c8966" alt="event kakaotalk message" width="300px"/>
</div>

## Description

### Environments

- node v20

```bash
  nvm use
```

```bash
  nvm install lts/iron
```

### APIs Required

- [kakao developers](https://developers.kakao.com/)
  - kakao login
  - kakaotalk message API
- [lost ark open API](https://developer-lostark.game.onstove.com/)
  - events: `/news/events`

### Server

only handles root directory(`/`) to get authorization code from redirect URL route.

### Author

mule-heo
