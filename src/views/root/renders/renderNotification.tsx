import React from 'react';

import Icon from '@/src/components/icon/Icon.tsx';
import List from '@/src/components/list/List.tsx';
import { ListRenderPropsT } from '@/src/components/list/types.ts';
import { NotificationT } from '@/src/store/store.tsx';

import I from '../types.ts';

const renderNotification: I['renderNotification'] = function () {
    const { notification } = this.props;

    return (
        <List
            renderKey={notification?.id}
            items={notification ? [{ _id: notification.id, ...notification }] : []}
            parentClass="body__notifications"
            itemClass="body__notificationsItem"
            itemStyleProps={[]}
            parentStyleProps={['width']}
            parentRealStyleProps={['width']}
            resizeWidth={true}
            render={(d: ListRenderPropsT<NotificationT>) => ({
                item: (
                    <div
                        className={this.getClass(
                            'body__notification _ROW _ROW_CENTER',
                            this.setClass(d.item.type),
                        )}
                    >
                        <div className="body__notificationInner _ROW">
                            <Icon
                                className="body__notificationIcon"
                                name={
                                    d.item.type === 'error'
                                        ? 'notification-error'
                                        : 'notification-success'
                                }
                            />
                            <p className="body__notificationText">{d.item.text}</p>
                        </div>
                    </div>
                ),
            })}
        />
    );
};

export default renderNotification;
