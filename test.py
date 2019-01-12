l = [
    {
        'city': '上海', 'nation': '中国', 'type': 1,
    },
    {
        'city': '北京', 'nation': '美国', 'type': 1,
    },
    {
        'city': '南京', 'nation': '英国', 'type': 1,
    }
]

def update_type_one(item):
    if item.get('type') == 1:
        item['nation'] = '中国'
    return item

r = map(update_type_one, l)

print(list(r))