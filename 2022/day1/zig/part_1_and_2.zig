const std = @import("std");

var general_purpose_allocator = std.heap.GeneralPurposeAllocator(.{}){};
const gpa = general_purpose_allocator.allocator();

fn greaterThan(context: void, a: i32, b: i32) std.math.Order {
    _ = context;
    return std.math.order(b, a);
}

pub fn main() !void {
    var file = try std.fs.cwd().openFile("../input.txt", .{});
    defer file.close();

    var pq = std.PriorityQueue(i32, void, greaterThan).init(gpa, {});

    const content = try file.reader().readAllAlloc(gpa, 1 << 16);
    defer gpa.free(content);

    var lines = std.mem.split(u8, content, "\n");

    var group_calories: i32 = 0;

    while (lines.next()) |line| {
        var x: i32 = std.fmt.parseInt(i32, line, 10) catch {
            try pq.add(group_calories);
            // std.log.info("{}\n", .{group_calories});
            group_calories = 0;
            continue;
        };
        group_calories += x;
    }

    var max1: i32 = pq.remove();
    var max2: i32 = pq.remove();
    var max3: i32 = pq.remove();

    std.debug.print("max el: {}\n", .{max1});
    std.debug.print("sum of 3 max: {}", .{max1 + max2 + max3});
}
